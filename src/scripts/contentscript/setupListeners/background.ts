import browser from 'webextension-polyfill'
import { EVENT_NAMES } from '../../../share/events'
import { SiteConnected } from '../../../share/message'

declare let cloneInto: any

export function setupBackgroundMessageListeners() {
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
}
