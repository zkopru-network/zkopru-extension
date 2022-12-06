import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'
import { parseUnits } from '@ethersproject/units'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import ROUTES from '../../../routes'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'
import { toWei } from '../../../share/utils'
import { useZkopruStore } from '../../store/zkopru'

import { Send, FormData } from './index'
import ToastContainer from '../../components/Toast'

const TransferPage = () => {
  const background = useBackgroundConnection()
  const [loading, setLoading] = useState(false)
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
  const onSubmit = async ({ recipient, amount, fee, token }: FormData) => {
    toast('submitting')
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
  }

  return (
    <>
      <ToastContainer />
      <Send
        onSubmit={onSubmit}
        tokens={
          erc20InfoQuery.data
            ? [
                {
                  symbol: 'ETH',
                  address: '0x0000000000000000000000000000000000000000',
                  decimals: 18
                },
                ...erc20InfoQuery.data
              ]
            : [
                {
                  symbol: 'ETH',
                  address: '0x0000000000000000000000000000000000000000',
                  decimals: 18
                }
              ]
        }
      />
    </>
  )
}

export default TransferPage
