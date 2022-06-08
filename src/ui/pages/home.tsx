import React from 'react'
import { css } from '@linaria/core'
// import browser from 'webextension-polyfill'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import Header from '../components/Header'
// import PrimaryButton from '../components/PrimaryButton'
// import {
//   GetBalanceRequestMessageCreator,
//   GetAddressRequestMessageCreator
// } from '../../share/message'
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
  const { t } = useTranslation()

  // const getBalance = async () => {
  //   await browser.runtime.sendMessage(GetBalanceRequestMessageCreator())
  // }

  // const getAddress = async () => {
  //   await browser.runtime.sendMessage(GetAddressRequestMessageCreator())
  // }

  return (
    <div className={container}>
      <Header />
      <div className={body}>
        <span>
          {t('address')}: {shortenAddress(address)}
        </span>
        <span>
          {t('balance')}: {balance} ETH
        </span>

        <Link to="transfer">{t('transfer')}</Link>
      </div>
    </div>
  )
}

export default HomePage
