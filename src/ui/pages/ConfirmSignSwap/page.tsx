import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { formatUnits } from '@ethersproject/units'
import toast from 'react-hot-toast'
import ConfirmSignSwap from './index'
import routes from '../../../routes'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'
import ExtensionFrame from '../../components/ExtensionFrame'
import Button from '../../components/Button'

const ConfirmSignSwapPage = () => {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
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
    fee,
    tabId
  } = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string)
  }) as any

  const sendErc20 = useMemo(() => {
    if (sendToken === '0x0000000000000000000000000000000000000000') {
      return {
        symbol: 'ETH',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000'
      }
    }
    return erc20InfoQuery.data?.find((info) => info.address === sendToken)
  }, [erc20InfoQuery.data, sendToken])
  const receiveErc20 = useMemo(() => {
    if (receiveToken === '0x0000000000000000000000000000000000000000') {
      return {
        symbol: 'ETH',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000'
      }
    }
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
    toast.loading('Signing Transaction')
    const res = await background.signSwap(
      sendToken,
      sendAmount,
      receiveToken,
      receiveAmount,
      counterParty,
      Number(salt),
      fee,
      tabId
    )

    if (res.payload.result) {
      setSuccess(true)
    } else {
      toast('Something went wrong')
    }
  }, [])

  if (success) {
    return (
      <ExtensionFrame>
        <div>
          <h1 className="text-2xl font-bold leading-tight">
            Sign Swap Complete
          </h1>
          <div className="my-2 gap-2 flex justify-center">
            <Button variant="ghost" onClick={window.close}>
              Close
            </Button>
          </div>
        </div>
      </ExtensionFrame>
    )
  }

  return (
    <ConfirmSignSwap
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

export default ConfirmSignSwapPage
