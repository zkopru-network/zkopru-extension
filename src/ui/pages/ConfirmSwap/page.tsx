import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { formatUnits } from '@ethersproject/units'
import ConfirmSwap from './index'
import routes from '../../../routes'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'

const ConfirmSwapPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const background = useBackgroundConnection()
  const erc20InfoQuery = useQuery(['erc20Info'], async () => {
    return (await background.loadERC20Info()).payload
  })

  const {
    sendToken,
    sendAmount,
    receiveToken,
    receiveAmount,
    counterParty,
    salt,
    fee
  } = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string)
  }) as any

  const sendErc20 = useMemo(() => {
    return erc20InfoQuery.data?.find((info) => info.address === sendToken)
  }, [erc20InfoQuery.data, sendToken])
  const receiveErc20 = useMemo(() => {
    return erc20InfoQuery.data?.find((info) => info.address === receiveToken)
  }, [erc20InfoQuery.data, receiveToken])

  const sendAmountF = useMemo(() => {
    if (!sendErc20) return sendAmount
    return formatUnits(sendAmount, sendErc20.decimals)
  }, [sendErc20, sendAmount])

  const receiveAmountF = useMemo(() => {
    if (!receiveErc20) return receiveAmount
    return formatUnits(sendAmount, receiveErc20.decimals)
  }, [receiveAmount, receiveErc20])

  const handleSwap = useCallback(async () => {
    setLoading(true)
    const response = await background.swap(
      sendToken,
      sendAmount,
      receiveToken,
      receiveAmount,
      counterParty,
      Number(salt),
      fee
    )
    setLoading(false)
    if (response.payload.hash) navigate(routes.SWAP_COMPLETE)
  }, [])

  return (
    <ConfirmSwap
      onCancel={() => navigate(routes.HOME)}
      handleSwap={handleSwap}
      sendAmount={sendAmountF}
      sendErc20={sendErc20}
      receiveAmount={receiveAmountF}
      receiveErc20={receiveErc20}
      fee={fee}
    />
  )
}

export default ConfirmSwapPage
