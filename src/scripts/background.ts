import browser from 'webextension-polyfill'
// @ts-ignore
import Zkopru, { ZkAccount } from '@zkopru/client/browser'
import { store as backgroundStore } from './store'
import { WEBSOCKET_URL, ZKOPRU_CONTRACT } from '../share/constants'
import {
  WalletKeyGeneratedMessageCreator,
  GetBalanceRequestMessageCreator,
  GetBalanceResponseMessageCreator,
  GetAddressRequestMessageCreator,
  GetAddressResponseMessageCreator,
  UntypedMessage
} from '../share/message'
import { waitUntil } from '../share/utils'

// TODO: extract listener method
// define background status for zkopru client
// INITIAL

async function init() {
  // initialize
  // check if the user has used wallet before by checking password exists in database
  // if password doesn't exist, dispatch DISPLAY_INIT_SCREEN
  // if password exists check if password lock time has passed.
  // if yes, use the wallet key stored to initialize client
  // if not, display generate page.
}

async function main() {
  await init()

  // TODO: check storage and if no walletKey exist, load wallet key by sending message
  // to content script.
  browser.runtime.onMessage.addListener(async (message: UntypedMessage) => {
    if (WalletKeyGeneratedMessageCreator.match(message)) {
      console.log('[BACKGROUND] WalletKeyGenerated message received')
      const { walletKey } = message.payload
      const state = backgroundStore.getState()
      state.setWalletKey(walletKey)
      console.log('[BACKGROUND] start syncing client')
      const client = new Zkopru.Node({
        websocket: WEBSOCKET_URL,
        accounts: [new ZkAccount(walletKey)],
        address: ZKOPRU_CONTRACT
      })
      state.setClient(client)
      try {
        await client.initNode()
        console.log('[BACKGROUND] client.initNode() called')
        // load wallet to set account in node
        const wallet = new Zkopru.Wallet(client, walletKey)
        state.setWallet(wallet)
        state.setAddress(wallet.wallet.account.zkAddress.address)

        // wait until tracker.transferTrackers are ready
        // TODO: use await ZkopruWallet.new() if ready
        await waitUntil(() => client.node.tracker.transferTrackers.length === 1)
        await client.start()
      } catch (e) {
        console.error(e)
      }
      state.setInitialized(true)
      console.log('[BACKGROUND] Zkopru node initialized')
    } else if (GetBalanceRequestMessageCreator.match(message)) {
      const wallet = backgroundStore.getState().wallet
      // TODO: if wallet is not initialized, return error message
      if (!wallet) return

      console.log('[BACKGROUND] Balance message received')

      const spendable = await wallet.wallet.getSpendableAmount()
      const { eth, erc20, erc721 } = spendable
      console.log('[BACKGROUND] spendable: ', spendable)

      // TODO: add erc20, erc721 asset
      browser.runtime.sendMessage(
        GetBalanceResponseMessageCreator({ balance: eth.toString() })
      )
    } else if (GetAddressRequestMessageCreator.match(message)) {
      // TODO: error handling. how to send back error message?
      const { address } = backgroundStore.getState()
      if (address)
        browser.runtime.sendMessage(
          GetAddressResponseMessageCreator({ address })
        )
    }
  })
}

main()
