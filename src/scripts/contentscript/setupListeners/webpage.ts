import browser from 'webextension-polyfill'
import { injectScript } from '../injectScript'
import { fetchStatus, generateDepositEthTx } from '../conn'
import { isCustomEvent } from '../../../share/utils'
import { EVENT_NAMES } from '../../../share/events'
import { WalletKeyGeneratedMessageCreator } from '../../../share/message'
import { BACKGROUND_STATUS, ALLOW_ORIGIN_LIST } from '../../../share/constants'

/**
 * Inject inpage.js to ask signature to generate wallet key
 * to initialize L2 wallet.
 * This method must be run after onboarding completed.
 */
function getSignature() {
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

export function setupWebpageMessageListeners() {
  window.addEventListener(EVENT_NAMES.GENERATE_WALLET_KEY, async () => {
    const status = await fetchStatus()
    if (
      status === BACKGROUND_STATUS.NEED_KEY_GENERATION &&
      ALLOW_ORIGIN_LIST.includes(window.location.origin)
    ) {
      getSignature()
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
}
