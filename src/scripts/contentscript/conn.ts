import browser from 'webextension-polyfill'
import { BACKGROUND_STATUS } from '../../share/constants'
import {
  UntypedMessage,
  GetBackgroundStatusRequest,
  GetBackgroundStatusResponse,
  DepositEthRequest,
  DepositEthResponse,
  DepositERC20Request,
  DepositERC20Response,
  DepositERC721Request,
  DepositERC721Response,
  IsConnectedResponse,
  IsConnectedRequest
} from '../../share/message'
import type {
  DepositData,
  DepositERC20Data,
  DepositERC721Data,
  L1TxParams
} from '../../share/types'

/**
 * fetch background status from background script
 */
export async function fetchStatus(): Promise<BACKGROUND_STATUS> {
  return new Promise<BACKGROUND_STATUS>((resolve) => {
    function handleMessage(message: UntypedMessage) {
      console.log(message)
      if (GetBackgroundStatusResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.status)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(GetBackgroundStatusRequest())
  })
}

export async function checkSiteIsConnected(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    function handleMessage(message: UntypedMessage) {
      if (IsConnectedResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.isConnected)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(
      IsConnectedRequest({ origin: window.location.origin })
    )
  })
}

export async function generateDepositEthTx(
  data: DepositData
): Promise<L1TxParams> {
  return new Promise((resolve) => {
    function handleMessage(message: UntypedMessage) {
      if (DepositEthResponse.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.params)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(DepositEthRequest({ data }))
  })
}

export async function generateDepositERC20Tx(
  data: DepositERC20Data
): Promise<L1TxParams> {
  return new Promise((resolve) => {
    function handleMessage(message: UntypedMessage) {
      if (DepositERC20Response.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.params)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(DepositERC20Request({ data }))
  })
}

export async function generateDepositERC721Tx(
  data: DepositERC721Data
): Promise<L1TxParams> {
  return new Promise((resolve) => {
    function handleMessage(message: UntypedMessage) {
      if (DepositERC721Response.match(message)) {
        browser.runtime.onMessage.removeListener(handleMessage)
        resolve(message.payload.params)
      }
    }

    browser.runtime.onMessage.addListener(handleMessage)
    browser.runtime.sendMessage(DepositERC721Request({ data }))
  })
}
