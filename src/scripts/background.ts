import browser from 'webextension-polyfill'
// @ts-ignore
import Zkopru, { ZkAccount } from '@zkopru/client/browser'
import { sha512_256 } from 'js-sha512'
import ROUTES from '../routes'
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
  VerifyPasswordResponse,
  DepositEthRequest,
  DepositEthResponse,
  TransferEthRequest,
  TransferEthResponse,
  WithdrawEthRequest,
  WithdrawEthResponse,
  LoadActivityRequest,
  LoadActivityResponse,
  IsConnectedRequest,
  IsConnectedResponse,
  ConfirmConnectSite,
  ConnectSiteRequest,
  ConnectSiteResponse,
  DebugMessage,
  SiteConnected,
  ConfirmPopup
} from '../share/message'
import { waitUntil, toWei, toGwei } from '../share/utils'
import { showPopupWindow } from './utils'

async function initClient(walletKey: string, l1Address: string) {
  const state = backgroundStore.getState()
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
    state.setL1Address(l1Address)

    // TODO: use await ZkopruWallet.new() when ready
    await waitUntil(() => client.node.tracker.transferTrackers.length === 1)
    await client.start()
  } catch (e) {
    console.error(e)
  }
}

async function init() {
  const setStatus = backgroundStore.getState().setStatus
  setStatus(BACKGROUND_STATUS.STARTINGUP)

  // decide if user has onboarded before by checking password exists
  const db = await browser.storage.local.get([
    'password',
    'walletKey',
    'l1Address'
  ])
  if (db.walletKey) {
    setStatus(BACKGROUND_STATUS.INITIALIZED)
    await initClient(db.walletKey, db.l1Address)
  } else if (db.password) {
    setStatus(BACKGROUND_STATUS.NEED_KEY_GENERATION)
  } else {
    setStatus(BACKGROUND_STATUS.NOT_ONBOARDED)
  }
}

function getSendMessage(sender: browser.Runtime.MessageSender) {
  return sender.tab
    ? (message: UntypedMessage) =>
        browser.tabs.sendMessage(sender.tab!.id!, message)
    : browser.runtime.sendMessage
}

async function main() {
  // add listener for status request in case message received while initialization
  browser.runtime.onMessage.addListener(
    async (message: UntypedMessage, sender) => {
      if (GetBackgroundStatusRequest.match(message)) {
        const { status } = backgroundStore.getState()
        getSendMessage(sender)(GetBackgroundStatusResponse({ status }))
      }
    }
  )

  await init()

  // TODO: extract listener method
  browser.runtime.onMessage.addListener(
    async (message: UntypedMessage, sender) => {
      // switch send message target based on the message sender.
      // if sender is content script, use browser.tabs.sendMessage
      // otherwise use runtime.sendMessage to send to popup
      const sendMessage = getSendMessage(sender)
      const setStatus = backgroundStore.getState().setStatus
      if (WalletKeyGeneratedMessageCreator.match(message)) {
        setStatus(BACKGROUND_STATUS.LOADING)
        console.log('[BACKGROUND] generate wallet key')
        const { walletKey, l1Address } = message.payload
        const state = backgroundStore.getState()

        // TODO: save encrypted wallet key using password
        await browser.storage.local.set({ walletKey, l1Address })
        state.setWalletKey(walletKey)

        console.log('[BACKGROUND] initialize zkoprut client')
        await initClient(walletKey, l1Address)
        setStatus(BACKGROUND_STATUS.INITIALIZED)
        await showPopupWindow()
      } else if (GetBalanceRequestMessageCreator.match(message)) {
        const wallet = backgroundStore.getState().wallet
        // TODO: if wallet is not initialized, return error message
        if (!wallet) return

        const spendable = await wallet.wallet.getSpendableAmount()
        const { eth } = spendable

        // TODO: add erc20, erc721 asset
        sendMessage(
          GetBalanceResponseMessageCreator({ balance: eth.toString() })
        )
      } else if (GetAddressRequestMessageCreator.match(message)) {
        // TODO: error handling. how to send back error message?
        const { address } = backgroundStore.getState()
        if (address) sendMessage(GetAddressResponseMessageCreator({ address }))
      } else if (RegisterPasswordRequest.match(message)) {
        const hash = sha512_256(message.payload.password)
        await browser.storage.local.set({ password: hash })
        sendMessage(RegisterPasswordResponse())
        setStatus(BACKGROUND_STATUS.NEED_KEY_GENERATION)
      } else if (VerifyPasswordRequest.match(message)) {
        const saved = await browser.storage.local.get('password')
        const hash = sha512_256(message.payload.password)
        sendMessage(VerifyPasswordResponse({ result: saved.password === hash }))
      } else if (DepositEthRequest.match(message)) {
        const { amount, fee } = message.payload.data
        const wallet = backgroundStore.getState().wallet

        // TODO: add onComplete to deposit tx sent listener
        const { to, data, value, onComplete } = wallet.wallet.depositEtherTx(
          toWei(amount),
          toWei(fee)
        )
        sendMessage(DepositEthResponse({ params: { to, data, value } }))
      } else if (TransferEthRequest.match(message)) {
        const { amount, fee, to } = message.payload
        const wallet = backgroundStore.getState().wallet

        // TODO: error handling
        try {
          const tx = await wallet.generateEtherTransfer(
            to,
            toWei(amount),
            toGwei(fee)
          )
          const hash = await wallet.wallet.sendTx({
            tx
          })
          sendMessage(TransferEthResponse({ hash }))
        } catch (e) {
          // TODO: send error response
          console.error(e)
        }
      } else if (WithdrawEthRequest.match(message)) {
        // TODO: validate payload
        const { amount, fee, instantWithdrawFee } = message.payload
        const to = backgroundStore.getState().l1Address

        const wallet = backgroundStore.getState().wallet

        try {
          const tx = await wallet.generateWithdrawal(
            to,
            toWei(amount),
            toGwei(fee),
            toWei(instantWithdrawFee || '0')
          )
          const hash = await wallet.wallet.sendTx({
            tx
          })
          sendMessage(WithdrawEthResponse({ hash }))
        } catch (e) {
          // TODO: send error response
          console.error(e)
        }
      } else if (LoadActivityRequest.match(message)) {
        const { wallet, l1Address } = backgroundStore.getState()
        const l2Address = wallet.wallet.account.zkAddress.toString()
        const { history, pending } = await wallet.transactionsFor(
          l2Address,
          l1Address
        )

        // TODO: type correctly
        const result = [
          ...(pending || []),
          ...(history || [])
            .filter((h: any) => h.proposal)
            .sort(
              (a: any, b: any) => b.proposal.timestamp - a.proposal.timestamp
            )
        ]

        sendMessage(LoadActivityResponse({ activities: result }))
      } else if (IsConnectedRequest.match(message)) {
        const db = await browser.storage.local.get('connectedSites')
        if (db.connectedSites) {
          const result = db.connectedSites.includes(message.payload.origin)
          sendMessage(IsConnectedResponse({ isConnected: result }))
          return
        }

        sendMessage(IsConnectedResponse({ isConnected: false }))
      } else if (ConfirmConnectSite.match(message)) {
        showPopupWindow(ROUTES.CONFIRM_CONNECTION, {
          origin: message.payload.origin,
          tabId: String(sender.tab?.id)
        })
      } else if (ConnectSiteRequest.match(message)) {
        try {
          const db = await browser.storage.local.get('connectedSites')
          if (db.connectedSites) {
            if (!db.connectedSites.includes(message.payload.origin)) {
              browser.storage.local.set({
                connectedSites: [...db.connectedSites, message.payload.origin]
              })
            }
          } else {
            browser.storage.local.set({
              connectedSites: [message.payload.origin]
            })
          }
          sendMessage(
            ConnectSiteResponse({
              result: true
            })
          )
          const tabs = await browser.tabs.query({ active: true })
          browser.tabs.sendMessage(
            tabs[0].id as number,
            SiteConnected({ origin: message.payload.origin })
          )
        } catch (e) {
          sendMessage(
            ConnectSiteResponse({
              result: false
            })
          )
        }
      } else if (ConfirmPopup.match(message)) {
        showPopupWindow(message.payload.path, message.payload.params)
      } else if (DebugMessage.match(message)) {
        console.log(message)
      }
    }
  )
}

main()
