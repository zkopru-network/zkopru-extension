import * as React from 'react'
import { createRoot } from 'react-dom/client'
import browser, { Runtime } from 'webextension-polyfill'
import { getBalanceRequestMessageFactory, UntypedMessage } from '../message'

const Popup = () => {
  const [address, setAddress] = React.useState()

  // TODO: check if background client is initialized

  React.useEffect(() => {
    async function messageHandler(
      message: UntypedMessage,
      sender: Runtime.MessageSender
    ) {
      console.log(message)
      // TODO: set state of displaying balance
      // store.dispatch(SOME_ACTION(message.balance))
    }

    browser.runtime.onMessage.addListener(messageHandler)
  }, [])

  // periodically fetch balance. maybe define in state. not inside local component
  // send get balance request message to background
  const getBalance = async () => {
    await browser.runtime.sendMessage(getBalanceRequestMessageFactory())
  }

  return (
    <div>
      <h1>ZKOPRU</h1>
      <span>Address: {}</span>
      <button onClick={getBalance}>getBalance()</button>
    </div>
  )
}

const container = document.getElementById('popup') as HTMLElement
const root = createRoot(container)

root.render(<Popup />)
