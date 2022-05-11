import browser from 'webextension-polyfill'
import { EVENT_NAMES } from './constants'
import { injectScript } from './injectScript'
import { walletKeyGeneratedMessageFactory } from './message'
import { isCustomEvent } from './utils'

async function main() {
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
      walletKeyGeneratedMessageFactory(e.detail.walletKey)
    )
  })

  injectScript(browser.runtime.getURL('inpage.js'))
}

main()
