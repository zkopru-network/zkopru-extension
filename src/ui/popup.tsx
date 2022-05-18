import * as React from 'react'
import { createRoot } from 'react-dom/client'
import browser, { Runtime } from 'webextension-polyfill'
import {
  getBalanceRequestMessageFactory,
  getAddressRequestMessageFactory,
  UntypedMessage,
  isGetAddressResponseMessage,
  isGetBalanceResponseMessage
} from '../message'
import { useStore } from './store'
import { shortenAddress } from '../utils'

const Popup = () => {
  // TODO: dispatch initialization action
  const { address, balance, setAddress, setBalance } = useStore()

  // TODO: check if background client is initialized

  React.useEffect(() => {
    async function messageHandler(
      message: UntypedMessage,
      sender: Runtime.MessageSender
    ) {
      console.log(message)
      if (isGetAddressResponseMessage(message)) {
        // TODO: use store
        setAddress(message.payload.address)
      } else if (isGetBalanceResponseMessage(message)) {
        // TODO: use store
        // e.g. store.dispatch(SOME_ACTION(message.balance))
        setBalance(message.payload.balance)
      }
    }

    browser.runtime.onMessage.addListener(messageHandler)
  }, [])

  // periodically fetch balance. maybe define in state. not inside local component
  // send get balance request message to background
  const getBalance = async () => {
    await browser.runtime.sendMessage(getBalanceRequestMessageFactory())
  }

  const getAddress = async () => {
    await browser.runtime.sendMessage(getAddressRequestMessageFactory())
  }

  return (
    <div>
      <h1>ZKOPRU</h1>
      <span>Address: {shortenAddress(address)}</span>
      <span>Balance: {balance}</span>
      <button onClick={getBalance}>Get balance</button>
      <button onClick={getAddress}>Get address</button>
    </div>
  )
}

const container = document.getElementById('popup') as HTMLElement
const root = createRoot(container)

root.render(<Popup />)
