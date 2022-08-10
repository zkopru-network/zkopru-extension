import React from 'react'
import browser from 'webextension-polyfill'
import { useZkopruStore } from './store/zkopru'
import { useStore } from './store'
import * as Message from '../share/message'
import { TIMEOUT } from '../share/constants'
import type { Activity } from '../share/types'

/**
 *
 */
class BackgroundConnection {
  constructor() {
    browser.runtime.onMessage.addListener(this.handleMessage)
  }

  async handleMessage(message: Message.UntypedMessage) {
    const { setZkAddress, setBalance, setConnectedSites } =
      useZkopruStore.getState()
    const { setBackgroundStatus } = useStore.getState()
    if (Message.GetAddressResponseMessageCreator.match(message)) {
      setZkAddress(message.payload.address)
    } else if (Message.GetBalanceResponseMessageCreator.match(message)) {
      setBalance(message.payload)
    } else if (Message.GetBackgroundStatusResponse.match(message)) {
      setBackgroundStatus(message.payload.status)
    } else if (Message.GetConnectedSitesResponse.match(message)) {
      setConnectedSites(message.payload.connectedSites)
    }
  }

  // syncWallet
  // fetch wallet data and set them in store

  // syncActivity
  // fetch activities and set them in store

  public async initialize() {
    // do initialization
  }

  /**
   * send GetBackgroundStatus message to background
   */
  public async getBackgroundStatus() {
    const message = await this.sendBackground(
      Message.GetBackgroundStatusRequest(),
      Message.GetBackgroundStatusResponse
    )
    return message.payload.status
  }

  /**
   * sync balance with background client
   */
  public async syncBalance() {
    await browser.runtime.sendMessage(Message.GetBalanceRequestMessageCreator())
  }

  /**
   * sync address with background client
   */
  public async syncZkAddress() {
    await browser.runtime.sendMessage(Message.GetAddressRequestMessageCreator())
  }

  /**
   * register password in background and wait its response
   * if password registered message doesn't respond in a TIMEOUT ms, reject
   */
  public registerPassword(
    password: string
  ): Promise<Message.MessageWithPayload<undefined>> {
    return this.sendBackground(
      Message.RegisterPasswordRequest({ password }),
      Message.RegisterPasswordResponse
    )
  }

  /**
   * check if given password is correct by sending message to background script
   */
  public async verifyPassword(
    password: string
  ): Promise<Message.MessageWithPayload<{ result: boolean }>> {
    return this.sendBackground(
      Message.VerifyPasswordRequest({ password }),
      Message.VerifyPasswordResponse
    )
  }

  public async transferEth(
    to: string,
    amount: number,
    fee: number
  ): Promise<Message.MessageWithPayload<{ hash: string }>> {
    return this.sendBackground(
      Message.TransferEthRequest({ to, amount, fee }),
      Message.TransferEthResponse
    )
  }

  public async withdrawEth(
    amount: number,
    fee: number,
    instantWithdrawFee: number
  ): Promise<Message.MessageWithPayload<{ hash: string }>> {
    return this.sendBackground(
      Message.WithdrawEthRequest({
        amount,
        fee,
        instantWithdrawFee
      }),
      Message.WithdrawEthResponse
    )
  }

  public async swap(
    sendToken: string,
    sendAmount: string,
    receiveToken: string,
    receiveAmount: string,
    counterParty: string,
    salt: number,
    fee: string
  ): Promise<Message.MessageWithPayload<{ hash: string }>> {
    return this.sendBackground(
      Message.SwapRequest({
        sendToken,
        sendAmount,
        receiveToken,
        receiveAmount,
        counterParty,
        salt,
        fee
      }),
      Message.SwapResponse
    )
  }

  public async loadActivity(): Promise<
    Message.MessageWithPayload<{ activities: Activity[] }>
  > {
    return this.sendBackground(
      Message.LoadActivityRequest(),
      Message.LoadActivityResponse
    )
  }

  public async connect(
    origin: string
  ): Promise<Message.MessageWithPayload<{ result: boolean }>> {
    return this.sendBackground(
      Message.ConnectSiteRequest({ origin }),
      Message.ConnectSiteResponse
    )
  }

  public async syncConnectedSites(): Promise<
    Message.MessageWithPayload<{ connectedSites: string[] }>
  > {
    return this.sendBackground(
      Message.GetConnectedSitesRequest(),
      Message.GetConnectedSitesResponse
    )
  }

  private async sendBackground<T>(
    requestMessage: Message.UntypedMessage,
    ResponseMessageCreator: Message.MessageCreator<T>
  ) {
    return new Promise<Message.MessageWithPayload<T>>((resolve, reject) => {
      function handleMessage(message: Message.UntypedMessage) {
        if (ResponseMessageCreator.match(message)) {
          browser.runtime.onMessage.removeListener(handleMessage)
          resolve(message)
        }
      }

      browser.runtime.onMessage.addListener(handleMessage)
      setTimeout(() => {
        browser.runtime.onMessage.removeListener(handleMessage)
        reject(new Error('Request timeout'))
      }, TIMEOUT)
      browser.runtime.sendMessage(requestMessage)
    })
  }
}

export const backgroundConnection = new BackgroundConnection()
export const BackgroundContext = React.createContext(backgroundConnection)
