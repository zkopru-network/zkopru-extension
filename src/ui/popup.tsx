import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'
import { css } from '@linaria/core'
import PrimaryButton from './components/PrimaryButton'
import {
  GetBalanceRequestMessageCreator,
  GetAddressRequestMessageCreator,
  GetBalanceResponseMessageCreator,
  GetAddressResponseMessageCreator,
  UntypedMessage
} from '../message'
import { useStore } from './store'
import { shortenAddress, fromWei } from '../utils'
import { globalStyle } from './globalStyle'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const Popup = () => {
  // TODO: dispatch initialization action
  const { address, balance, setAddress, setBalance } = useStore()

  // TODO: check if background client is initialized

  useEffect(() => {
    async function messageHandler(message: UntypedMessage) {
      console.log(message)
      if (GetAddressResponseMessageCreator.match(message)) {
        // TODO: use store
        setAddress(message.payload.address)
      } else if (GetBalanceResponseMessageCreator.match(message)) {
        // TODO: use store
        // e.g. store.dispatch(SOME_ACTION(message.balance))
        setBalance(fromWei(message.payload.balance))
      }
    }

    browser.runtime.onMessage.addListener(messageHandler)
  }, [])

  // periodically fetch balance. maybe define in state. not inside local component
  // send get balance request message to background
  const getBalance = async () => {
    await browser.runtime.sendMessage(GetBalanceRequestMessageCreator())
  }

  const getAddress = async () => {
    await browser.runtime.sendMessage(GetAddressRequestMessageCreator())
  }

  return (
    <div className={`${globalStyle} ${container}`}>
      <h1>ZKOPRU</h1>
      <span>Address: {shortenAddress(address)}</span>
      <span>Balance: {balance} ETH</span>
      <PrimaryButton onClick={getBalance}>Get balance</PrimaryButton>
      <PrimaryButton onClick={getAddress}>Get address</PrimaryButton>
    </div>
  )
}

const reactContainer = document.getElementById('popup') as HTMLElement
const root = createRoot(reactContainer)

root.render(<Popup />)
