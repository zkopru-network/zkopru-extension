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
  DepositEthRequest,
  DepositEthResponse,
  WalletKeyGeneratedMessageCreator,
  ConfirmConnectSite,
  SiteConnected,
  IsConnectedResponse,
  IsConnectedRequest,
  ConfirmPopup
} from '../share/message'
import { isCustomEvent, waitUntilAsync } from '../share/utils'
import type { DepositData, DepositParams } from '../share/types'
import { showPopupWindow } from './utils'

// cloneInto is global function to set window.wrappedJSObject
declare let cloneInto: any
declare global {
  interface Window {
    wrappedJSObject: any
  }
}

/**
 * fetch background status from background script
 */
async function fetchStatus(): Promise<BACKGROUND_STATUS> {
  return new Promise<BACKGROUND_STATUS>((resolve) => {
    function handleMessage(message: UntypedMessage) {
      console.log(message)
      if (GetBackgroundStatusResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.status)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(GetBackgroundStatusRequest())
  })
}

async function generateDepositEthTx(data: DepositData): Promise<DepositParams> {
  return new Promise<DepositParams>((resolve) => {
    function handleMessage(message: UntypedMessage) {
      if (DepositEthResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.params)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(DepositEthRequest({ data }))
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
    console.log(
      '[CONTENT] WalletKeyGenerated event:',
      e.detail.walletKey,
      e.detail.l1Address
    )

    // pass generated wallet key to background script
    browser.runtime.sendMessage(
      null,
      WalletKeyGeneratedMessageCreator({
        walletKey: e.detail.walletKey,
        l1Address: e.detail.l1Address
      })
    )
  })

  injectScript(browser.runtime.getURL('inpage.js'))
}

async function checkSiteIsConnected(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    function handleMessage(message: UntypedMessage) {
      if (IsConnectedResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.isConnected)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(
      IsConnectedRequest({ origin: window.location.origin })
    )
  })
}

async function main() {
  injectScript(browser.runtime.getURL('sendTx.js'))
  window.addEventListener(EVENT_NAMES.GENERATE_WALLET_KEY, async () => {
    const status = await fetchStatus()
    if (
      status === BACKGROUND_STATUS.NEED_KEY_GENERATION &&
      ALLOW_ORIGIN_LIST.includes(window.location.origin)
    ) {
      injectAndGetSignature()
    }
  })
  window.addEventListener(EVENT_NAMES.DEPOSIT_ETH, async (e) => {
    if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
    const params = await generateDepositEthTx(e.detail.data)
    // clone object into window and make it available for page script
    window.wrappedJSObject.txParams = cloneInto(params, window, {
      cloneFunctions: true
    })
    window.dispatchEvent(
      new CustomEvent(EVENT_NAMES.SEND_TX, { detail: { params } })
    )
  })
  window.addEventListener(EVENT_NAMES.CONNECT, async (e) => {
    if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
    browser.runtime.sendMessage(
      null,
      ConfirmConnectSite({ origin: e.detail.origin })
    )
  })
  window.addEventListener(EVENT_NAMES.CONFIRM_POPUP, async (e) => {
    if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
    browser.runtime.sendMessage(
      null,
      ConfirmPopup({ path: e.detail.path as string, params: e.detail.params })
    )
  })

  browser.runtime.onMessage.addListener((message) => {
    if (
      SiteConnected.match(message) &&
      window.location.origin === message.payload.origin
    ) {
      window.wrappedJSObject.connectedSite = cloneInto(
        message.payload.origin,
        window,
        {
          cloneFunctions: true
        }
      )
      window.dispatchEvent(
        new CustomEvent(EVENT_NAMES.CONNECTED, {
          detail: { origin: message.payload.origin }
        })
      )
    }
  })
  injectScript(browser.runtime.getURL('setProvider.js'))

  let status: BACKGROUND_STATUS | undefined
  status = await fetchStatus()
  await waitUntilAsync(async () => {
    status = await fetchStatus()
    return (
      status !== BACKGROUND_STATUS.STARTINGUP &&
      status !== BACKGROUND_STATUS.LOADING
    )
  })

  // ask background if site is connected
  // if connected, dispatch CONNECTED event
  const connected = await checkSiteIsConnected()
  if (connected) {
    window.wrappedJSObject.connectedSite = cloneInto(
      window.location.origin,
      window,
      {
        cloneFunctions: true
      }
    )
    window.dispatchEvent(new Event(EVENT_NAMES.CONNECTED))
  }

  if (status === BACKGROUND_STATUS.NOT_ONBOARDED) {
    // show popup and start onboarding process(password registration)
  } else if (status === BACKGROUND_STATUS.INITIALIZED) {
    // just wait app connection
  }
}

main()
