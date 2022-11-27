import React, { useState } from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import shallow from 'zustand/shallow'
import { parseUnits } from '@ethersproject/units'
import PrimaryButton from '../components/PrimaryButton'
import {
  FieldControl,
  Input,
  Select,
  Label,
  ErrorMessage as E
} from '../components/Form'
import ROUTES from '../../routes'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import { toWei } from '../../share/utils'
import { useZkopruStore } from '../store/zkopru'
import { useQuery } from 'react-query'

type FormData = {
  amount: number
  fee: number
  recipient: string
  token: string
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
  const { balance } = useZkopruStore(
    (state) => ({
      balance: state.balance,
      zkAddress: state.zkAddress
    }),
    shallow
  )
  const erc20InfoQuery = useQuery(['erc20Info'], async () => {
    return (await background.loadERC20Info()).payload
  })

  const transfer = handleSubmit(async ({ recipient, amount, fee, token }) => {
    setLoading(true)

    // TODO: validate input, amount
    if (token === 'ETH') {
      const amountWei = toWei(amount)
      await background.transferEth(recipient, amountWei, fee)
    } else {
      const erc20 = erc20InfoQuery.data?.find((info) => info.symbol === token)
      if (!erc20) throw new Error('ERC20 not loaded')

      const amountDecimal = parseUnits(amount.toString(), erc20.decimals)
      await background.transferERC20(
        recipient,
        amountDecimal.toString(),
        erc20.address,
        fee
      )
    }

    setLoading(false)
    navigate(ROUTES.TRANFER_COMPLETE)
  })
  if (loading) {
    return (
      <div className={container}>
        <h2>Sending transaction</h2>
        <p>
          This will take a while. Closing this screen does not cancel the
          transaction.
        </p>
        <PrimaryButton onClick={() => navigate(ROUTES.HOME)}>
          Close
        </PrimaryButton>
      </div>
    )
  }

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
          <Label>{t('token')}</Label>
          <Select {...register('token')}>
            <option value="ETH">ETH</option>
            {balance?.tokenBalances &&
              Object.keys(balance.tokenBalances || {}).map((token) => (
                <option value={token} key={token}>
                  {token}
                </option>
              ))}
          </Select>
        </FieldControl>
        <FieldControl>
          <Label>{t('recipient')}</Label>
          <Input
            {...register('recipient', {
              required: t('error_message.required')
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
