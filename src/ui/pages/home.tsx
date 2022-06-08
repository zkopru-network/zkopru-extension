import React from 'react'
import { css } from '@linaria/core'
import browser from 'webextension-polyfill'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import Header from '../components/Header'
import PrimaryButton from '../components/PrimaryButton'
import {
  GetBalanceRequestMessageCreator,
  GetAddressRequestMessageCreator
} from '../../share/message'
import { shortenAddress } from '../../share/utils'

const container = css`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 480px;
`

const body = css`
  padding: 12px 24px;
  overflow-y: scroll;
`

const HomePage = () => {
  const { address, balance } = useStore()

  const getBalance = async () => {
    await browser.runtime.sendMessage(GetBalanceRequestMessageCreator())
  }

  const getAddress = async () => {
    await browser.runtime.sendMessage(GetAddressRequestMessageCreator())
  }

  return (
    <div className={container}>
      <Header />
      <div className={body}>
        <span>Address: {shortenAddress(address)}</span>
        <span>Balance: {balance} ETH</span>
        <PrimaryButton onClick={getBalance}>Get balance</PrimaryButton>
        <PrimaryButton onClick={getAddress}>Get address</PrimaryButton>

        <Link to="transfer">Transfer</Link>
      </div>
    </div>
  )
}

export default HomePage
