import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { formatUnits } from '@ethersproject/units'
import ConfirmTransfer from './index'
import routes from '../../../routes'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'

const ConfirmTransferPage = () => {
  const background = useBackgroundConnection()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // TODO: get params once
  // TODO: type and validate params
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string)
  }) as any

  const to = params.to
  const amount = params.amount
  const fee = Number(params.fee)
  const token = params.token

  const erc20InfoQuery = useQuery(['erc20Info'], async () => {
    return (await background.loadERC20Info()).payload
  })
  const erc20 = useMemo(() => {
    return erc20InfoQuery.data?.find((info) => info.address === token)
  }, [erc20InfoQuery.data, token])

  const amountF = useMemo(() => {
    if (!erc20) return amount
    return formatUnits(amount, erc20.decimals)
  }, [erc20, amount])

  const handleTransfer = useCallback(async () => {
    if (!erc20) {
      // erc20 not loaded
      return
    }
    setLoading(true)
    if (token === '0x00') {
      // transfer eth
      const response = await background.transferEth(to, amount, fee)
      if (response.payload.hash) navigate(routes.TRANFER_COMPLETE)
    } else {
      // transfer erc20
      const response = await background.transferERC20(
        to,
        amount,
        erc20.address,
        fee
      )
      if (response.payload.hash) navigate(routes.TRANFER_COMPLETE)
    }
  }, [])

  const onCancel = () => {
    navigate(routes.HOME)
  }

  return (
    <ConfirmTransfer
      onCancel={onCancel}
      handleTransfer={handleTransfer}
      formattedAmount={amountF}
      erc20={erc20}
      fee={fee}
    />
  )
}

export default ConfirmTransferPage
