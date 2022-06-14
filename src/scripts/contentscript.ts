import browser from 'webextension-polyfill'
import { injectScript } from './injectScript'
import {
  BACKGROUND_STATUS,
  EVENT_NAMES,
  ALLOW_ORIGIN_LIST
} from '../share/constants'
import {
  UntypedMessage,
  GetBackgroundStatusRequest,
  GetBackgroundStatusResponse,
  WalletKeyGeneratedMessageCreator
} from '../share/message'
import { isCustomEvent, waitUntilAsync } from '../share/utils'

/**
 * fetch background status from background script
 */
async function fetchStatus(): Promise<BACKGROUND_STATUS> {
  return new Promise<BACKGROUND_STATUS>((resolve) => {
    function handleMessage(message: UntypedMessage) {
      console.log('message')
      if (GetBackgroundStatusResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.status)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(GetBackgroundStatusRequest())
  })
}

/**
 * Inject inpage.js to ask signature to generate wallet key
 * to initialize L2 wallet.
 * This method must be run after onboarding completed.
 */
function injectAndGetSignature() {
  // subscribe inpage.js walletKey generated event
  window.addEventListener(EVENT_NAMES.WALLET_KEY_GENERATED, (e: Event) => {
    // TODO: use more specific type guard in isCustomEvent has to return with detail type
    if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
    console.log('[CONTENT] WalletKeyGenerated event:', e.detail.walletKey)

    // pass generated wallet key to background script
    browser.runtime.sendMessage(
      null,
      WalletKeyGeneratedMessageCreator({ walletKey: e.detail.walletKey })
    )
  })

  injectScript(browser.runtime.getURL('inpage.js'))
}

async function main() {
  console.log('[CONTENT] script loaded')
  let status: BACKGROUND_STATUS | undefined
  status = await fetchStatus()
  console.log(status)
  await waitUntilAsync(async () => {
    status = await fetchStatus()
    return status !== BACKGROUND_STATUS.STARTINGUP
  })

  console.log('background status is', status)

  if (status === BACKGROUND_STATUS.NOT_ONBOARDED) {
    // do nothing.
    // after registering password, open onboarding page
    // and ask signature
  } else if (status === BACKGROUND_STATUS.NEED_KEY_GENERATION) {
    // on ask signature
  } else if (status === BACKGROUND_STATUS.INITIALIZED) {
    // do nothing
    // just wait app connection
  }

  // poll background status
  // wait while status is STARGINGUP
  // if NOT_ONBOARDED => show popup and start onboarding process(password registration)
  // if INITIALIZED => start client by injecting inpage.js
  // inject inpage.js after onboarding has complete.
  // check if zkopru is initialized in background script
  // if yes, set zkopru client to window object in set-client.js
  // TODO: listen connect

  // TODO: get background status and if NEED_KEY_GENERATION, run this method
  // if (ALLOW_ORIGIN_LIST.includes(window.location.origin)) {
  //   injectAndGetSignature()
  // }
}

main()
