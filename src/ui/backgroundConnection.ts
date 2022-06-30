import React from 'react'
import browser from 'webextension-polyfill'
import { useZkopruStore } from './store/zkopru'
import { useStore } from './store'
import {
  UntypedMessage,
  MessageCreator,
  GetBalanceRequestMessageCreator,
  GetBalanceResponseMessageCreator,
  GetAddressRequestMessageCreator,
  GetAddressResponseMessageCreator,
  GetBackgroundStatusResponse,
  GetBackgroundStatusRequest,
  RegisterPasswordRequest,
  MessageWithPayload,
  RegisterPasswordResponse,
  VerifyPasswordRequest,
  VerifyPasswordResponse,
  TransferEthRequest,
  TransferEthResponse,
  WithdrawEthRequest,
  WithdrawEthResponse,
  LoadActivityRequest,
  LoadActivityResponse
} from '../share/message'
import { fromWei } from '../share/utils'
import { TIMEOUT } from '../share/constants'
import type { Activity } from '../share/types'

/**
 *
 */
class BackgroundConnection {
  constructor() {
    browser.runtime.onMessage.addListener(this.handleMessage)
  }

  async handleMessage(message: UntypedMessage) {
    const { setZkAddress, setBalance } = useZkopruStore.getState()
    const { setBackgroundStatus } = useStore.getState()
    if (GetAddressResponseMessageCreator.match(message)) {
      setZkAddress(message.payload.address)
    } else if (GetBalanceResponseMessageCreator.match(message)) {
      setBalance(fromWei(message.payload.balance))
    } else if (GetBackgroundStatusResponse.match(message)) {
      setBackgroundStatus(message.payload.status)
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
      GetBackgroundStatusRequest(),
      GetBackgroundStatusResponse
    )
    return message.payload.status
  }

  /**
   * sync balance with background client
   */
  public async syncBalance() {
    await browser.runtime.sendMessage(GetBalanceRequestMessageCreator())
  }

  /**
   * sync address with background client
   */
  public async syncZkAddress() {
    await browser.runtime.sendMessage(GetAddressRequestMessageCreator())
  }

  /**
   * register password in background and wait its response
   * if password registered message doesn't respond in a TIMEOUT ms, reject
   */
  public registerPassword(
    password: string
  ): Promise<MessageWithPayload<undefined>> {
    return this.sendBackground(
      RegisterPasswordRequest({ password }),
      RegisterPasswordResponse
    )
  }

  /**
   * check if given password is correct by sending message to background script
   */
  public async verifyPassword(
    password: string
  ): Promise<MessageWithPayload<{ result: boolean }>> {
    return this.sendBackground(
      VerifyPasswordRequest({ password }),
      VerifyPasswordResponse
    )
  }

  public async transferEth(
    to: string,
    amount: number,
    fee: number
  ): Promise<MessageWithPayload<{ hash: string }>> {
    return this.sendBackground(
      TransferEthRequest({ to, amount, fee }),
      TransferEthResponse
    )
  }

  public async withdrawEth(
    amount: number,
    fee: number,
    instantWithdrawFee: number
  ): Promise<MessageWithPayload<{ hash: string }>> {
    return this.sendBackground(
      WithdrawEthRequest({
        amount,
        fee,
        instantWithdrawFee
      }),
      WithdrawEthResponse
    )
  }

  public async loadActivity(): Promise<
    MessageWithPayload<{ activities: Activity[] }>
  > {
    return this.sendBackground(LoadActivityRequest(), LoadActivityResponse)
  }

  private async sendBackground<T>(
    requestMessage: UntypedMessage,
    ResponseMessageCreator: MessageCreator<T>
  ) {
    return new Promise<MessageWithPayload<T>>((resolve, reject) => {
      function handleMessage(message: UntypedMessage) {
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
