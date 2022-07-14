import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@linaria/core'
import { ROUTES } from '../../share/constants'
import { fromWei, shortenAddress } from '../../share/utils'
import PrimaryButton from '../components/PrimaryButton'
import useBackgroundConnection from '../hooks/useBackgroundConnection'

const TransferConfirmPage = () => {
  const navigate = useNavigate()
  const background = useBackgroundConnection()
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string)
  }) as any
  const to = params.to
  const amount = params.amount
  const [loading, setLoading] = useState(false)

  // TODO: get and show on popup
  const fee = 24000

  const handleTransfer = async () => {
    console.log('transfer', to, fromWei(amount), fee)
    setLoading(true)
    const response = await background.transferEth(to, fromWei(amount), fee)
    if (response.payload.hash) navigate(ROUTES.TRANFER_COMPLETE)
  }

  if (loading) {
    return (
      <div>
        <h1>Sending transaction...</h1>
      </div>
    )
  }

  return (
    <div className={container}>
      <h1>Confirm Transfer</h1>
      <p>To: {shortenAddress(to)}</p>
      <p>Amount: {fromWei(amount)}</p>
      <div className={buttonSection}>
        <PrimaryButton onClick={window.close}>Cancel</PrimaryButton>
        <PrimaryButton onClick={handleTransfer}>Transfer</PrimaryButton>
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

export default TransferConfirmPage
