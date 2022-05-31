import React from 'react'
import { css } from '@linaria/core'
import browser from 'webextension-polyfill'
import {
  GetBalanceRequestMessageCreator,
  GetAddressRequestMessageCreator
} from '../../message'
import { shortenAddress } from '../../utils'
import PrimaryButton from '../components/PrimaryButton'
import { useStore } from '../store'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const Dashboard = () => {
  const { address, balance } = useStore()

  const getBalance = async () => {
    await browser.runtime.sendMessage(GetBalanceRequestMessageCreator())
  }

  const getAddress = async () => {
    await browser.runtime.sendMessage(GetAddressRequestMessageCreator())
  }

  return (
    <div className={container}>
      <h1>ZKOPRU</h1>
      <span>Address: {shortenAddress(address)}</span>
      <span>Balance: {balance} ETH</span>
      <PrimaryButton onClick={getBalance}>Get balance</PrimaryButton>
      <PrimaryButton onClick={getAddress}>Get address</PrimaryButton>
    </div>
  )
}

export default Dashboard
