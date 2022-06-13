import browser from 'webextension-polyfill'
// @ts-ignore
import Zkopru, { ZkAccount } from '@zkopru/client/browser'
import { sha512_256 } from 'js-sha512'
import { store as backgroundStore } from './store'
import {
  WEBSOCKET_URL,
  ZKOPRU_CONTRACT,
  BACKGROUND_STATUS
} from '../share/constants'
import {
  WalletKeyGeneratedMessageCreator,
  GetBalanceRequestMessageCreator,
  GetBalanceResponseMessageCreator,
  GetAddressRequestMessageCreator,
  GetAddressResponseMessageCreator,
  UntypedMessage,
  GetBackgroundStatusResponse,
  GetBackgroundStatusRequest,
  RegisterPasswordRequest,
  VerifyPasswordRequest,
  RegisterPasswordResponse,
  VerifyPasswordResponse
} from '../share/message'
import { waitUntil } from '../share/utils'

async function init() {
  const setStatus = backgroundStore.getState().setStatus

  setStatus(BACKGROUND_STATUS.INITIALIZING)
  browser.runtime.sendMessage(
    GetBackgroundStatusResponse({ status: BACKGROUND_STATUS.INITIALIZING })
  )

  // decide if user has onboarded before by checking password exists
  const db = await browser.storage.local.get('password')
  if (!db.password) {
    browser.runtime.sendMessage(
      GetBackgroundStatusResponse({ status: BACKGROUND_STATUS.NOT_ONBOARDED })
    )
    setStatus(BACKGROUND_STATUS.NOT_ONBOARDED)
    return
  }

  browser.runtime.sendMessage(
    GetBackgroundStatusResponse({ status: BACKGROUND_STATUS.INITIALIZED })
  )
  setStatus(BACKGROUND_STATUS.INITIALIZED)
}

async function main() {
  await init()

  // TODO: extract listener method
  browser.runtime.onMessage.addListener(async (message: UntypedMessage) => {
    if (GetBackgroundStatusRequest.match(message)) {
      const { status } = backgroundStore.getState()
      browser.runtime.sendMessage(GetBackgroundStatusResponse({ status }))
    } else if (WalletKeyGeneratedMessageCreator.match(message)) {
      console.log('[BACKGROUND] WalletKeyGenerated message received')
      const { walletKey } = message.payload
      const state = backgroundStore.getState()
      // TODO: save encrypted wallet key using password
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
        // TODO: use await ZkopruWallet.new() when ready
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
    } else if (RegisterPasswordRequest.match(message)) {
      const hash = sha512_256(message.payload.password)
      await browser.storage.local.set({ password: hash })
      browser.runtime.sendMessage(RegisterPasswordResponse())
    } else if (VerifyPasswordRequest.match(message)) {
      const saved = await browser.storage.local.get('password')
      const hash = sha512_256(message.payload.password)
      browser.runtime.sendMessage(
        VerifyPasswordResponse({ result: saved.password === hash })
      )
    }
  })
}

main()
