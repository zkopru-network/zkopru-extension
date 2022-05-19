import browser from 'webextension-polyfill'
// @ts-ignore
import Zkopru, { ZkAccount } from '@zkopru/client/browser'
import { WEBSOCKET_URL, ZKOPRU_CONTRACT } from './constants'
import {
  WalletKeyGeneratedMessageCreator,
  GetBalanceRequestMessageCreator,
  GetBalanceResponseMessageCreator,
  GetAddressRequestMessageCreator,
  GetAddressResponseMessageCreator,
  UntypedMessage
} from './message'
import { store as backgroundStore } from './store'
import { logDoNothingFor } from './utils'

const logDoNothingForBackground = (reason: string) =>
  logDoNothingFor(reason, { scriptName: '[BACKGROUND]' })

async function main() {
  console.log('hi, I am background script new')
  // TODO: dispatch initialize action

  // TODO: check storage and if no walletKey exist, load wallet key by sending message
  // to content script.
  browser.runtime.onMessage.addListener(
    async (message: UntypedMessage, sender) => {
      console.log(message, sender)
      if (WalletKeyGeneratedMessageCreator.match(message)) {
        console.log('[BACKGROUND] WalletKeyGenerated message received')
        const { walletKey } = message.payload
        const state = backgroundStore.getState()
        state.setWalletKey(walletKey)

        console.log('[BACKGROUND] start syncing client')
        const client = Zkopru.Node({
          websocket: WEBSOCKET_URL,
          accounts: [new ZkAccount(walletKey)],
          address: ZKOPRU_CONTRACT
        })
        state.setClient(client)
        console.log('[BACKGROUND] Zkopru.Node initialized')
        await client.initNode()
        console.log('[BACKGROUND] client.initNode() called')
        await client.start()
        console.log('[BACKGROUND] client.start() called')
        console.log('[BACKGROUND] set wallet')
        const wallet = new Zkopru.Wallet(client, walletKey)
        state.setWallet(wallet)
        state.setAddress(wallet.wallet.account.zkAddress.address)
        state.setInitialized(true)
      } else if (GetBalanceRequestMessageCreator.match(message)) {
        console.log('[BACKGROUND] Balance message received')
        // TODO: load l2 balance if not loaded.

        const spendable = await backgroundStore
          .getState()
          .wallet?.wallet.getSpendableAmount()
        console.log('[BACKGROUND] spendable: ', spendable)

        browser.runtime.sendMessage(
          GetBalanceResponseMessageCreator({ balance: 10 })
        )

        // send back message using
      } else if (GetBalanceResponseMessageCreator.match(message)) {
        logDoNothingForBackground(message.type)
      } else if (GetAddressRequestMessageCreator.match(message)) {
        // TODO: error handling. how to send back error message?
        const { address } = backgroundStore.getState()
        console.log(address)
        if (address)
          browser.runtime.sendMessage(
            GetAddressResponseMessageCreator({ address })
          )
      }
    }
  )
}

main()
