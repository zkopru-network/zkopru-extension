import browser from 'webextension-polyfill'
// @ts-ignore
import Zkopru, { ZkAccount } from '@zkopru/client/browser'
import { WEBSOCKET_URL, ZKOPRU_CONTRACT } from './constants'
import {
  isWalletKeyGeneratedMessage,
  isGetBalanceRequestMessage,
  isGetBalanceResponseMessage,
  UntypedMessage,
  getBalanceResponseMessageFactory,
  isGetAddressRequestMessage,
  getAddressResponseMessageFactory
} from './message'
import { logDoNothingFor } from './utils'

const logDoNothingForBackground = (reason: string) =>
  logDoNothingFor(reason, { scriptName: '[BACKGROUND]' })

// TODO: state management needed.
// use something like redux
type State = {
  walletKey: null | string
  client: Zkopru.Node | null // TODO: add typings to Zkopru.Node
  wallet: Zkopru.Wallet | null // TODO: add typings to Zkopru.Wallet
  address: string | null
  initialized: boolean
}

const initState = (): State => ({
  walletKey: null,
  client: null,
  wallet: null,
  address: null,
  initialized: false
})

async function main() {
  const rootState = initState()
  console.log('hi, I am background script new')

  // TODO: check storage and if no walletKey exist, load wallet key by sending message
  // to content script.
  browser.runtime.onMessage.addListener(
    async (message: UntypedMessage, sender) => {
      console.log(message, sender)
      if (isWalletKeyGeneratedMessage(message)) {
        console.log('[BACKGROUND] WalletKeyGenerated message received')
        const { walletKey } = message.payload
        rootState.walletKey = walletKey

        console.log('[BACKGROUND] start syncing client')
        rootState.client = Zkopru.Node({
          websocket: WEBSOCKET_URL,
          accounts: [new ZkAccount(walletKey)],
          address: ZKOPRU_CONTRACT
        })
        console.log('[BACKGROUND] Zkopru.Node initialized')
        await rootState.client.initNode()
        console.log('[BACKGROUND] client.initNode() called')
        await rootState.client.start()
        console.log('[BACKGROUND] client.start() called')
        console.log('[BACKGROUND] set wallet')
        rootState.wallet = new Zkopru.Wallet(
          rootState.client,
          rootState.walletKey
        )
        rootState.address = rootState.wallet.wallet.account.zkAddress.address
        rootState.initialized = true
      } else if (isGetBalanceRequestMessage(message)) {
        console.log('[BACKGROUND] Balance message received')
        // TODO: load l2 balance if not loaded.

        const spendable = await rootState.wallet.wallet.getSpendableAmount()
        console.log('[BACKGROUND] spendable: ', spendable)

        browser.runtime.sendMessage(getBalanceResponseMessageFactory(10))

        // send back message using
      } else if (isGetBalanceResponseMessage(message)) {
        logDoNothingForBackground(message.type)
      } else if (isGetAddressRequestMessage(message)) {
        // TODO: error handling. how to send back error message?
        if (rootState.address)
          browser.runtime.sendMessage(
            getAddressResponseMessageFactory(rootState.address)
          )
      }
    }
  )
}

main()
