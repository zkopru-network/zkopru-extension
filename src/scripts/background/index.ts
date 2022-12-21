import browser from 'webextension-polyfill'
// @ts-ignore
import Zkopru, { ZkAccount, UtxoStatus } from '@zkopru/client/browser'

import { sha512_256 } from 'js-sha512'
import ROUTES from '../../routes'
import { store as backgroundStore } from '../store'
import {
  WEBSOCKET_URL,
  ZKOPRU_CONTRACT,
  BACKGROUND_STATUS
} from '../../share/constants'
import * as Message from '../../share/message'
import { waitUntil, toWei, toGwei, fromWei } from '../../share/utils'
import { showPopupWindow } from '../utils'
import type { TokenBalances } from '../../share/types'

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
    console.log('[BACKGROUND] client.initNode()')
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
    ? (message: Message.UntypedMessage) =>
        browser.tabs.sendMessage(sender.tab!.id!, message)
    : browser.runtime.sendMessage
}

async function main() {
  // add listener for status request in case message received while initialization
  browser.runtime.onMessage.addListener(
    async (message: Message.UntypedMessage, sender) => {
      if (Message.GetBackgroundStatusRequest.match(message)) {
        const { status } = backgroundStore.getState()
        getSendMessage(sender)(Message.GetBackgroundStatusResponse({ status }))
      }
    }
  )

  await init()

  // TODO: extract listener method
  browser.runtime.onMessage.addListener(
    async (message: Message.UntypedMessage, sender) => {
      // switch send message target based on the message sender.
      // if sender is content script, use browser.tabs.sendMessage
      // otherwise use runtime.sendMessage to send to popup
      const sendMessage = getSendMessage(sender)
      const setStatus = backgroundStore.getState().setStatus
      if (Message.WalletKeyGeneratedMessageCreator.match(message)) {
        setStatus(BACKGROUND_STATUS.LOADING)
        const { walletKey, l1Address } = message.payload
        const state = backgroundStore.getState()

        // TODO: save encrypted wallet key using password
        await browser.storage.local.set({ walletKey, l1Address })
        state.setWalletKey(walletKey)

        console.log('[BACKGROUND] initialize zkoprut client')
        await initClient(walletKey, l1Address)
        setStatus(BACKGROUND_STATUS.INITIALIZED)
        await showPopupWindow()
      } else if (Message.GetBalanceRequestMessageCreator.match(message)) {
        const { wallet, client } = backgroundStore.getState()

        // TODO: if wallet is not initialized, return error message
        if (!wallet) return

        const [spendable, locked, erc20Info, utxos] = await Promise.all([
          wallet.wallet.getSpendableAmount(),
          wallet.wallet.getLockedAmount(),
          client.node.loadERC20Info(),
          wallet.wallet.getUtxos(null, [
            UtxoStatus.UNSPENT,
            UtxoStatus.SPENDING
          ])
        ])

        const { eth, erc20, erc721 } = spendable
        // TODO: type acc and token
        const tokensByAddress = erc20Info.reduce((acc: any, token: any) => {
          return {
            [token.address.toLowerCase()]: token,
            ...acc
          }
        }, {})
        const balance = fromWei(eth.toString())
        let tokenBalances: TokenBalances = {}
        for (const _address of Object.keys(erc20)) {
          const token = tokensByAddress[_address.toLowerCase()]
          if (!token) continue
          tokenBalances = {
            ...tokenBalances,
            [token.symbol]: +erc20[_address].toString() / 10 ** +token.decimals
          }
        }

        let lockedTokenBalances: TokenBalances = {}
        for (const _address of Object.keys(locked.erc20)) {
          const token = tokensByAddress[_address.toLowerCase()]
          if (!token) continue
          lockedTokenBalances = {
            ...lockedTokenBalances,
            [token.symbol]:
              +locked.erc20[_address].toString() / 10 ** +token.decimals
          }
        }

        console.log(erc721, utxos)
        // for (const _address of Object.keys(erc721)) {
        //   const token = tokensByAddress[_address.toLowerCase()]
        //   if (!token) continue
        //   tokenBalances = {
        //     ...tokenBalances,
        //     [token.symbol]: erc721[_address]
        //   }
        // }

        sendMessage(
          Message.GetBalanceResponseMessageCreator({
            eth: balance,
            tokenBalances,
            lockedTokenBalances
          })
        )
      } else if (Message.GetAddressRequestMessageCreator.match(message)) {
        // TODO: error handling. how to send back error message?
        const { address } = backgroundStore.getState()
        if (address)
          sendMessage(Message.GetAddressResponseMessageCreator({ address }))
      } else if (Message.RegisterPasswordRequest.match(message)) {
        const hash = sha512_256(message.payload.password)
        await browser.storage.local.set({ password: hash })
        sendMessage(Message.RegisterPasswordResponse())
        setStatus(BACKGROUND_STATUS.NEED_KEY_GENERATION)
      } else if (Message.VerifyPasswordRequest.match(message)) {
        const saved = await browser.storage.local.get('password')
        const hash = sha512_256(message.payload.password)
        sendMessage(
          Message.VerifyPasswordResponse({ result: saved.password === hash })
        )
      } else if (Message.DepositEthRequest.match(message)) {
        const { amount, fee } = message.payload.data
        const wallet = backgroundStore.getState().wallet

        // TODO: add onComplete to deposit tx sent listener
        const { to, data, value } = wallet.wallet.depositEtherTx(amount, fee)
        sendMessage(Message.DepositEthResponse({ params: { to, data, value } }))
      } else if (Message.DepositERC20Request.match(message)) {
        const { amount, fee, address } = message.payload.data
        const wallet = backgroundStore.getState().wallet

        const { to, data, value } = wallet.wallet.depositERC20Tx(
          0,
          address,
          amount,
          fee
        )
        sendMessage(
          Message.DepositERC20Response({ params: { to, data, value } })
        )
      } else if (Message.DepositERC721Request.match(message)) {
        const { address, tokenId, fee } = message.payload.data
        const wallet = backgroundStore.getState().wallet.wallet
        const { to, data, value } = wallet.depositERC721Tx(
          0,
          address,
          tokenId,
          fee
        )
        console.log(to, data, value)
        sendMessage(
          Message.DepositERC721Response({ params: { to, data, value } })
        )
      } else if (Message.TransferEthRequest.match(message)) {
        const { amount, fee, to } = message.payload
        const wallet = backgroundStore.getState().wallet

        // TODO: error handling
        try {
          const tx = await wallet.generateEtherTransfer(to, amount, toGwei(fee))
          const hash = await wallet.wallet.sendTx({
            tx
          })
          sendMessage(Message.TransferEthResponse({ hash }))
        } catch (e) {
          console.error(e)
          sendMessage(
            Message.ErrorMessage({ message: `transfer eth failed: ${e}` })
          )
        }
      } else if (Message.TransferERC20Request.match(message)) {
        const { amount, fee, to, token } = message.payload
        const wallet = backgroundStore.getState().wallet
        try {
          const tx = await wallet.generateTokenTransfer(
            to,
            amount,
            token,
            toGwei(fee)
          )
          const hash = await wallet.wallet.sendTx({
            tx
          })
          sendMessage(Message.TransferERC20Response({ hash }))
        } catch (e) {
          console.error(e)
          sendMessage(
            Message.ErrorMessage({ message: `transfer eth failed: ${e}` })
          )
        }
      } else if (Message.GenerateSwapTxRequest.match(message)) {
        showPopupWindow(ROUTES.SWAP_SIGN_CONFIRM, {
          ...message.payload,
          tabId: sender.tab?.id?.toString() || ''
        })
      } else if (Message.SignSwapTxRequest.match(message)) {
        const {
          sendToken,
          sendAmount,
          receiveAmount,
          receiveToken,
          fee,
          salt,
          counterParty,
          meta
        } = message.payload

        const wallet = backgroundStore.getState().wallet
        try {
          const tx = await wallet.generateSwapTransaction(
            counterParty,
            sendToken,
            sendAmount.toString(),
            receiveToken,
            receiveAmount.toString(),
            fee,
            salt
          )
          const zkTx = await wallet.wallet.shieldTx({ tx })
          console.log('shiledTx', zkTx)
          // send to popup
          sendMessage(
            Message.SignSwapTxResponse({ result: true, message: 'success' })
          )
          // send to webpage
          if (meta?.tabId) {
            browser.tabs.sendMessage(
              Number(meta!.tabId!),
              Message.GenerateSwapTxResponse({
                tx: zkTx.encode().toString('hex')
              })
            )
          }
        } catch (e) {
          sendMessage(
            Message.ErrorMessage({ message: `generating swap tx failed {e}` })
          )
        }
      } else if (Message.BroadcastTxRequest.match(message)) {
        const { transactions } = message.payload
        const wallet = backgroundStore.getState().wallet
        try {
          const coordinatorUrl =
            await wallet.wallet.coordinatorManager.activeCoordinatorUrl()
          const response = await fetch(`${coordinatorUrl}/txs`, {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(transactions)
          })

          sendMessage(
            Message.BroadcastTxResponse({
              result: response.status === 200,
              message: response.status === 200 ? '' : await response.text()
            })
          )
        } catch (e) {
          console.log('error', e)
          sendMessage(
            Message.ErrorMessage({ message: 'broadcast transactions fail' })
          )
        }
      } else if (Message.SwapRequest.match(message)) {
        const {
          sendToken,
          sendAmount,
          receiveAmount,
          receiveToken,
          fee,
          salt,
          counterParty
        } = message.payload
        const wallet = backgroundStore.getState().wallet
        try {
          const tx = await wallet.generateSwapTransaction(
            counterParty,
            sendToken,
            sendAmount.toString(),
            receiveToken,
            receiveAmount.toString(),
            fee,
            salt
          )
          const hash = await wallet.wallet.sendTx({ tx })
          sendMessage(Message.SwapResponse({ hash }))
        } catch (e) {
          console.error(e)
          sendMessage(Message.ErrorMessage({ message: `swap failed: ${e}` }))
        }
      } else if (Message.WithdrawEthRequest.match(message)) {
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
          sendMessage(Message.WithdrawEthResponse({ hash }))
        } catch (e) {
          console.error(e)
          sendMessage(
            Message.ErrorMessage({ message: `withdraw eth failed: ${e}` })
          )
        }
      } else if (Message.LoadActivityRequest.match(message)) {
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

        sendMessage(Message.LoadActivityResponse({ activities: result }))
      } else if (Message.IsConnectedRequest.match(message)) {
        const db = await browser.storage.local.get('connectedSites')
        if (db.connectedSites) {
          const result = db.connectedSites.includes(message.payload.origin)
          sendMessage(Message.IsConnectedResponse({ isConnected: result }))
          return
        }
        sendMessage(Message.IsConnectedResponse({ isConnected: false }))
      } else if (Message.LoadERC20InfoRequest.match(message)) {
        const { client } = backgroundStore.getState()
        const erc20Info = await client.node.loadERC20Info()
        sendMessage(Message.LoadERC20InfoResponse(erc20Info))
      } else if (Message.ConfirmConnectSite.match(message)) {
        showPopupWindow(ROUTES.CONFIRM_CONNECTION, {
          origin: message.payload.origin,
          tabId: String(sender.tab?.id)
        })
      } else if (Message.ConnectSiteRequest.match(message)) {
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
            Message.ConnectSiteResponse({
              result: true
            })
          )
          const tabs = await browser.tabs.query({ active: true })
          browser.tabs.sendMessage(
            tabs[0].id as number,
            Message.SiteConnected({ origin: message.payload.origin })
          )
        } catch (e) {
          sendMessage(
            Message.ConnectSiteResponse({
              result: false
            })
          )
        }
      } else if (Message.GetConnectedSitesRequest.match(message)) {
        const db = await browser.storage.local.get('connectedSites')
        sendMessage(
          Message.GetConnectedSitesResponse({
            connectedSites: db.connectedSites || []
          })
        )
      } else if (Message.ConfirmPopup.match(message)) {
        showPopupWindow(message.payload.path, message.payload.params)
      } else if (Message.DebugMessage.match(message)) {
        console.log(message)
      }
    }
  )
}

main()
