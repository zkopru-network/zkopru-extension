import React from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/PrimaryButton'
import { ROUTES } from '../../share/constants'

const WithdrawPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const withdraw = async () => {
    navigate(ROUTES.HOME)
  }

  return (
    <div className={container}>
      <h1 className={pageTitle}>{t('withdraw')}</h1>
      <PrimaryButton onClick={withdraw}>{t('withdraw')}</PrimaryButton>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  overflow-y: scroll;
`

const pageTitle = css`
  text-transform: capitalize;
`

export default WithdrawPage
