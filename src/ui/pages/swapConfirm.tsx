import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@linaria/core'
import ROUTES from '../../routes'
import { fromWei, shortenAddress } from '../../share/utils'
import PrimaryButton from '../components/PrimaryButton'
import useBackgroundConnection from '../hooks/useBackgroundConnection'

const SwapConfirmPage = () => {
  // TODO: validation
  const navigate = useNavigate()
  const background = useBackgroundConnection()

  // TODO: get params once
  // TODO: type and validate params
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
  const [loading, setLoading] = useState(false)

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
    if (response.payload.hash) navigate(ROUTES.SWAP_COMPLETE)
  }, [])

  if (loading) {
    return (
      <div>
        <h1>Sending transaction...</h1>
      </div>
    )
  }

  return (
    <div className={container}>
      <h1>Confirm Swap</h1>
      <p>Send Token: {sendToken}</p>
      <p>Send Amount: {sendAmount}</p>
      <p>Receive Token: {receiveToken}</p>
      <p>Receive Amount: {receiveAmount}</p>
      <p>Fee: {fee}</p>
      <div className={buttonSection}>
        <PrimaryButton onClick={window.close}>Cancel</PrimaryButton>
        <PrimaryButton onClick={handleSwap}>Swap</PrimaryButton>
      </div>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  overflow-y: scroll;
`

const buttonSection = css`
  display: flex;
  justify-content: space-between;
`
export default SwapConfirmPage
