import React from 'react'
import { css } from '@linaria/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useZkopruStore } from '../store/zkopru'
import Header from '../components/Header'
import shallow from 'zustand/shallow'

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
  const { balance } = useZkopruStore(
    (state) => ({
      balance: state.balance,
      zkAddress: state.zkAddress
    }),
    shallow
  )
  const { t } = useTranslation()

  return (
    <div className={container}>
      <Header />
      <div className={body}>
        <span>
          {t('balance')}: {balance} ETH
        </span>

        <Link to="transfer">{t('transfer')}</Link>
      </div>
    </div>
  )
}

export default HomePage
