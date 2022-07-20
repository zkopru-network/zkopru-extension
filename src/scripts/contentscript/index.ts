import browser from 'webextension-polyfill'
import { injectScript } from './injectScript'
import { fetchStatus, checkSiteIsConnected } from './conn'
import { BACKGROUND_STATUS } from '../../share/constants'
import { setupProvider } from './setupListeners/provider'
import { setupWebpageMessageListeners } from './setupListeners/webpage'
import { setupBackgroundMessageListeners } from './setupListeners/background'
import { EVENT_NAMES } from '../../share/events'
import { waitUntilAsync } from '../../share/utils'

async function main() {
  injectScript(browser.runtime.getURL('sendL1Tx.js'))

  setupWebpageMessageListeners()
  setupBackgroundMessageListeners()
  setupProvider()

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
}

main()
