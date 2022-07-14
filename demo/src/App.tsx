import React, { useState } from 'react'
import { useQuery } from 'react-query'
import './App.css'
import { useZkopru } from './zkopru/useZkopru'
import { toWei } from './utils'

function App() {
  const { zkopru, active } = useZkopru()
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState(0)

  const handleConnect = () => {
    zkopru?.connect()
  }

  const handleSubmitTx = async () => {
    const amountString = toWei(amount)
    await zkopru?.transferEth(to, amountString)
  }

  const balance = useQuery(
    ['balance'],
    async () => {
      await zkopru?.getBalance()
    },
    {
      enabled: active && !!zkopru
    }
  )
  console.log(balance.data)

  if (!zkopru) return <div className="App">Loading</div>

  return (
    <div className="App">
      <h1>Demo app</h1>
      {!zkopru.connected && (
        <button onClick={handleConnect}>Connect zkopru</button>
      )}
      {zkopru.connected && (
        <div>
          <p>Zkopru is connected to this page</p>
          <p>Try submit your first tx!</p>
          <div className="Form">
            <input
              type="string"
              className="Form-Item"
              placeholder="to"
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="number"
              className="Form-Item"
              placeholder="amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={handleSubmitTx} className="Primary">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
