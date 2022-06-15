import React, { useState } from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/PrimaryButton'
import { Input } from '../components/Form'
import { ROUTES } from '../../share/constants'

const TransferPage = () => {
  const [amount, setAmount] = useState(0)
  const [fee, setFee] = useState(0)

  const { t } = useTranslation()
  const navigate = useNavigate()
  const transfer = async () => {
    //

    navigate(ROUTES.HOME)
  }

  return (
    <div className={container}>
      <h1 className={pageTitle}>{t('transfer')}</h1>

      <Input
        placeholder={t('amount')}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Input
        placeholder={t('fee')}
        onChange={(e) => setFee(Number(e.target.value))}
      />
      <PrimaryButton onClick={transfer}>{t('transfer')}</PrimaryButton>
    </div>
  )
}

const container = css`
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 24px;
  overflow-y: scroll;
`

const pageTitle = css`
  text-transform: capitalize;
`

export default TransferPage
