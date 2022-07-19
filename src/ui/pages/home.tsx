import React from 'react'
import { css } from '@linaria/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import shallow from 'zustand/shallow'
import { useZkopruStore } from '../store/zkopru'
import Header from '../components/Header'
import { ONBOARDING_URL } from '../../share/constants'
import ROUTES from '../../routes'

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
        <div className={balanceSection}>
          <span className={balanceValue}>{balance}</span>
          <span className={unit}>ETH</span>
        </div>

        <div className={linkSection}>
          <a
            className={linkItem}
            onClick={() => {
              open(`${ONBOARDING_URL}/deposit`)
              close()
            }}
          >
            {t('deposit')}
          </a>
          <Link to={ROUTES.WITHDRAW} className={linkItem}>
            {t('withdraw')}
          </Link>
          <Link to={ROUTES.TRANSFER} className={linkItem}>
            {t('transfer')}
          </Link>
          <Link to={ROUTES.ACTIVITY} className={linkItem}>
            {t('activity')}
          </Link>
        </div>
      </div>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
`

const body = css`
  padding: 12px 24px;
  overflow-y: scroll;
`

const balanceSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
`

const balanceValue = css`
  font-size: 36px;
`

const unit = css`
  font-size: 32px;
`

const linkSection = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const linkItem = css`
  text-transform: capitalize;
  background-color: #4c49ff;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
`

export default HomePage
