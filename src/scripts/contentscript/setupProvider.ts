import browser from 'webextension-polyfill'
import { injectScript } from './injectScript'
import { PROVIDER_EVENT_NAMES } from '../../share/events'
import {
  ConfirmConnectSite,
  ConfirmPopup,
  GetBalanceRequestMessageCreator,
  GetBalanceResponseMessageCreator
} from '../../share/message'
import { isCustomEvent } from '../../share/utils'

/**
 * setup event listeners related to zkopru provider
 * and inject the provider
 */
export function setupProvider() {
  //
  // subscribe PROVIDER EVENTS
  //

  window.addEventListener(PROVIDER_EVENT_NAMES.CONNECT, async (e) => {
    if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
    browser.runtime.sendMessage(
      null,
      ConfirmConnectSite({ origin: e.detail.origin })
    )
  })

  window.addEventListener(PROVIDER_EVENT_NAMES.CONFIRM_POPUP, async (e) => {
    if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
    browser.runtime.sendMessage(
      null,
      ConfirmPopup({ path: e.detail.path as string, params: e.detail.params })
    )
  })

  window.addEventListener(PROVIDER_EVENT_NAMES.BALANCE_REQUEST, async (e) => {
    const reqOrigin = (e.target as Window).origin
    // TODO: abstract send message from content <-> background
    browser.runtime.onMessage.addListener((message) => {
      if (GetBalanceResponseMessageCreator.match(message)) {
        window.postMessage(
          {
            eventName: PROVIDER_EVENT_NAMES.BALANCE_RESPONSE,
            payload: message.payload.balance
          },
          reqOrigin
        )
      }
    })
    browser.runtime.sendMessage(null, GetBalanceRequestMessageCreator())
  })

  injectScript(browser.runtime.getURL('zkopruProvider.js'))
}
