import React, { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { utils } from 'ethers'
import { useZkopru } from './zkopru/useZkopru'
import type { L2Balance } from './zkopru/detectZkopru'
import { toWei, shortenAddress } from './utils'
import { useRegisteredERC20s, Token, ETH } from './useRegisteredERC20'
import { useRegisteredERC721s, ERC721 } from './useRegisteredERC721'
import './App.css'

function App() {
  const tokensQuery = useRegisteredERC20s()
  const erc721Query = useRegisteredERC721s()

  const { zkopru, active } = useZkopru()
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState(0)
  // swap items
  const [sendToken, setSendToken] = useState<Token | ERC721>(ETH)
  const [sendAmount, setSendAmount] = useState(0)
  const [receiveToken, setReceiveToken] = useState<Token | ERC721>(ETH)
  const [receiveAmount, setReceiveAmount] = useState(0)
  const [counterParty, setCounterParty] = useState('')
  const [swapFee, setSwapFee] = useState(0)
  const [salt, setSalt] = useState(0)

  // generated tx
  const [generatedTx, setGeneratedTx] = useState('')

  // send generated tx
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleConnect = () => {
    zkopru?.connect()
  }

  const handleSubmitTx = useCallback(async () => {
    const amountString = toWei(amount)
    await zkopru?.transferEth(to, amountString)
  }, [zkopru, amount, to])

  const handleSwap = useCallback(async () => {
    await zkopru?.swap(
      sendToken.address,
      isERC721(sendToken)
        ? sendAmount.toString()
        : utils
            .parseUnits(sendAmount.toString(), sendToken.decimals)
            .toString(),
      receiveToken.address,
      isERC721(receiveToken)
        ? receiveAmount.toString()
        : utils
            .parseUnits(receiveAmount.toString(), receiveToken.decimals)
            .toString(),
      counterParty,
      salt,
      utils.parseUnits(swapFee.toString(), 'gwei').toString()
    )
  }, [
    sendToken,
    sendAmount,
    receiveToken,
    receiveAmount,
    counterParty,
    salt,
    swapFee,
    zkopru
  ])
  const isERC721 = (t: Token | ERC721): t is ERC721 =>
    Object.keys(t).includes('name')

  const handleSignSwap = useCallback(async () => {
    const res = await zkopru?.generateSwapTx(
      sendToken.address,
      isERC721(sendToken)
        ? sendAmount.toString()
        : utils
            .parseUnits(sendAmount.toString(), sendToken.decimals)
            .toString(),
      receiveToken.address,
      isERC721(receiveToken)
        ? receiveAmount.toString()
        : utils
            .parseUnits(receiveAmount.toString(), receiveToken.decimals)
            .toString(),
      counterParty,
      salt,
      utils.parseUnits(swapFee.toString(), 'gwei').toString()
    )
    if (res) setGeneratedTx(res.tx)
  }, [
    sendToken,
    sendAmount,
    receiveToken,
    receiveAmount,
    counterParty,
    salt,
    swapFee,
    zkopru
  ])

  const handleSendTx = useCallback(async () => {
    setSending(true)
    const res = await zkopru?.broadcastTransactions([generatedTx])
    if (res?.result) {
      setSending(false)
      setSent(true)
    }
  }, [generatedTx, zkopru])

  const addressQuery = useQuery<string>(
    ['address'],
    async () => {
      const res = await zkopru?.getAddress()
      if (!res) throw new Error('No address')
      return res
    },
    { enabled: active && !!zkopru }
  )

  const balanceQuery = useQuery<L2Balance>(
    ['balance'],
    async () => {
      const res = await zkopru?.getBalance()
      if (!res) throw new Error('No balance')

      return res
    },
    {
      enabled: active && !!zkopru
    }
  )

  if (!zkopru) return <div className="App">Loading</div>

  return (
    <div className="App">
      <h1>Extension Demo</h1>
      {!zkopru.connected && (
        <button onClick={handleConnect} className="Connect">
          Connect zkopru
        </button>
      )}
      {zkopru.connected && (
        <div className="AppContainer">
          <p className="description">
            Zk Address:{' '}
            {addressQuery?.data ? shortenAddress(addressQuery.data) : ''}
          </p>
          <p className="description">
            Balance (ETH):{' '}
            {balanceQuery.data ? `${balanceQuery.data?.eth} ETH` : 'loading'}
          </p>
          <div className="Form">
            <h2 className="SectionTitle">Transfer</h2>
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
              Transfer
            </button>
          </div>

          <div className="Form">
            <h2 className="SectionTitle">Swap</h2>
            <label>Send Token</label>
            <select
              className="Form-Item"
              onChange={(e) => {
                // find token and set
                if (!tokensQuery.data) throw new Error('Token not loaded')
                if (!erc721Query.data) throw new Error('ERC721 not loaded')
                const token = [
                  ETH,
                  ...tokensQuery.data,
                  ...erc721Query.data
                ].find((token) => token.symbol === e.target.value)

                // never happen
                if (!token) return
                setSendToken(token)
              }}
            >
              <option value={ETH.symbol}>ETH</option>
              {tokensQuery.data &&
                tokensQuery.data.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              {erc721Query.data &&
                erc721Query.data.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.name} (NFT)
                  </option>
                ))}
            </select>
            <label>Send Amount / Token ID (NFT)</label>
            <input
              type="number"
              className="Form-Item"
              placeholder="Send Amount"
              onChange={(e) => setSendAmount(Number(e.target.value))}
            />
            <label>Receive Token</label>
            <select
              className="Form-Item"
              onChange={(e) => {
                // find token and set
                if (!tokensQuery.data) throw new Error('Token not loaded')
                if (!erc721Query.data) throw new Error('ERC721 not loaded')
                const token = [
                  ETH,
                  ...tokensQuery.data,
                  ...erc721Query.data
                ].find((token) => token.symbol === e.target.value)

                // never happen
                if (!token) return
                setReceiveToken(token)
              }}
            >
              <option value={ETH.symbol}>ETH</option>
              {tokensQuery.data &&
                tokensQuery.data.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              {erc721Query.data &&
                erc721Query.data.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.name} (NFT)
                  </option>
                ))}
            </select>
            <label>Receive Amount / Token ID (NFT)</label>
            <input
              type="number"
              className="Form-Item"
              placeholder="Receive Amount"
              onChange={(e) => setReceiveAmount(Number(e.target.value))}
            />
            <label>Counterparty address</label>
            <input
              type="string"
              className="Form-Item"
              placeholder="Counterparty"
              onChange={(e) => setCounterParty(e.target.value)}
            />
            <label>Fee (gwei per byte)</label>
            <input
              type="number"
              className="Form-Item"
              placeholder="Swap Fee"
              onChange={(e) => setSwapFee(Number(e.target.value))}
            />
            <label>Salt</label>
            <input
              type="number"
              className="Form-Item"
              placeholder="Salt"
              onChange={(e) => setSalt(Number(e.target.value))}
            />
            <button onClick={handleSwap} className="Primary">
              Swap
            </button>
            <button onClick={handleSignSwap} className="Primary">
              Sign Tx
            </button>
          </div>
          {generatedTx && (
            <div className="Generated-Tx-Section">
              <h3>Generated transaction</h3>
              <div className="Generated-Tx">{generatedTx}</div>
              <button onClick={handleSendTx} className="Primary full-width">
                Send TX
              </button>
              {sending && (
                <span className="TxStatus">Sending transaction...</span>
              )}
              {sent && <span className="TxStatus">Transaction sent!!</span>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
