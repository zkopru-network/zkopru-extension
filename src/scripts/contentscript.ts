import browser from 'webextension-polyfill'
import { injectScript } from './injectScript'
import { EVENT_NAMES } from '../share/constants'
import { WalletKeyGeneratedMessageCreator } from '../share/message'
import { isCustomEvent } from '../share/utils'

const NO_INIT = false

async function main() {
  if (NO_INIT) {
    return
  }
  // poll background status
  // wait while status is INITIALIZING
  // if NOT_ONBOARDED => show popup and start onboarding process(password registration)
  // if INITIALIZED => start client by injecting inpage.js
  // inject inpage.js after onboarding has complete.

  // check if zkopru is initialized in background script
  // if yes, set zkopru client to window object in set-client.js
  // if no,
  //    check the origin is zkopru.network if origin is correct, inject init-wallet.js
  //    if origin is not zkopru.network, do nothing
  console.log('[CONTENT] script loaded')

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

  // TODO: get background status and if NOT_ONBOARDED
  injectScript(browser.runtime.getURL('inpage.js'))
}

main()
