import React from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/PrimaryButton'
import { ROUTES } from '../../share/constants'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const TransferPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const confirm = async () => {
    console.log('transfer clicked')
    navigate(ROUTES.HOME)
  }

  return (
    <div className={container}>
      <h1>{t('transfer')}</h1>
      <PrimaryButton onClick={confirm}>{t('transfer')}</PrimaryButton>
    </div>
  )
}

export default TransferPage
