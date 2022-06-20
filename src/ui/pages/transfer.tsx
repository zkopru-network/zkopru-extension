import React, { useState } from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import PrimaryButton from '../components/PrimaryButton'
import {
  FieldControl,
  Input,
  Label,
  ErrorMessage as E
} from '../components/Form'
import { ROUTES } from '../../share/constants'
import useBackgroundConnection from '../hooks/useBackgroundConnection'

type FormData = {
  amount: number
  fee: number
  recipient: string
}

const TransferPage = () => {
  // TODO: use react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const [loading, setLoading] = useState(false)
  const background = useBackgroundConnection()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const transfer = handleSubmit(async ({ recipient, amount, fee }) => {
    setLoading(true)

    // TODO: validate input, amount
    const msg = await background.transferEth(recipient, amount, fee)
    console.log(msg)

    setLoading(false)
    navigate(ROUTES.TRANFER_COMPLETE)
  })

  return (
    <div className={container}>
      <div className={header}>
        <h1 className={pageTitle}>{t('transfer')}</h1>
        <a className={closeLink} onClick={() => navigate(ROUTES.HOME)}>
          x
        </a>
      </div>
      <form onSubmit={transfer}>
        <FieldControl>
          <Label>{t('recipient')}</Label>
          <Input
            {...register('recipient', {
              required: t('error_message.required'),
              valueAsNumber: true
            })}
            placeholder={t('recipient')}
          />
          <ErrorMessage
            errors={errors}
            name="recipient"
            render={({ message }) => <E>{message}</E>}
          />
        </FieldControl>
        <FieldControl>
          <Label>{t('amount')}</Label>
          <Input
            {...register('amount', {
              required: t('error_message.required'),
              valueAsNumber: true
            })}
            placeholder={t('amount')}
          />
          <ErrorMessage
            errors={errors}
            name="amount"
            render={({ message }) => <E>{message}</E>}
          />
        </FieldControl>
        <FieldControl>
          <Label>{t('fee')}</Label>
          <Input
            {...register('fee', {
              required: t('error_message.required'),
              valueAsNumber: true
            })}
            placeholder={t('fee')}
          />
          <ErrorMessage
            errors={errors}
            name="fee"
            render={({ message }) => <E>{message}</E>}
          />
        </FieldControl>
        <FieldControl>
          <PrimaryButton type="submit">{t('transfer')}</PrimaryButton>
        </FieldControl>
      </form>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  overflow-y: scroll;
`

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const pageTitle = css`
  text-transform: capitalize;
`

const closeLink = css`
  cursor: pointer;
  font-size: 20px;
`

export default TransferPage
