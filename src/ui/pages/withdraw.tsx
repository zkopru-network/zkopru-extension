import React, { useState } from 'react'
import { css } from '@linaria/core'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'
import {
  FieldControl,
  Input,
  Label,
  ErrorMessage as E
} from '../components/Form'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import ROUTES from '../../routes'

type FormData = {
  amount: number
  fee: number
  instantWithdrawalFee: number
}

const WithdrawPage = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const background = useBackgroundConnection()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const withdraw = handleSubmit(
    async ({ amount, fee, instantWithdrawalFee }) => {
      setLoading(true)
      const msg = await background.withdrawEth(
        amount,
        fee,
        instantWithdrawalFee
      )
      console.log(msg)

      setLoading(false)
      navigate(ROUTES.WITHDRAW_COMPLETE)
    }
  )

  return (
    <div className={container}>
      <div className={header}>
        <h1 className={pageTitle}>{t('withdraw')}</h1>
        <a className={closeLink} onClick={() => navigate(ROUTES.HOME)}>
          x
        </a>
      </div>
      <form onSubmit={withdraw}>
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
          <Label>{t('instantWithdrawal')}</Label>
          <Input
            {...register('instantWithdrawalFee', {
              required: true,
              valueAsNumber: true
            })}
            placeholder={t('instantWithdrawal')}
          />
          <ErrorMessage
            errors={errors}
            name="instantWithdrawalFee"
            render={({ message }) => <E>{message}</E>}
          />
        </FieldControl>
        <FieldControl>
          <PrimaryButton type="submit">{t('withdraw')}</PrimaryButton>
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

export default WithdrawPage
