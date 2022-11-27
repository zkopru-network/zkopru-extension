import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@linaria/core'
import ROUTES from '../../routes'
import { fromWei, shortenAddress } from '../../share/utils'
import PrimaryButton from '../components/PrimaryButton'
import useBackgroundConnection from '../hooks/useBackgroundConnection'

const TransferConfirmPage = () => {
  const navigate = useNavigate()
  const background = useBackgroundConnection()
  // const params = new Proxy(new URLSearchParams(window.location.search), {
  //   get: (searchParams, prop) => searchParams.get(prop as string)
  // }) as any
  const params = {
    to: '0x1234',
    amount: '1000000000000000000',
    fee: '24000',
    token: '0x00'
  }
  const to = params.to
  const amount = params.amount
  const token = params.token
  const fee = params.fee

  const [loading, setLoading] = useState(false)

  const handleTransfer = async () => {
    setLoading(true)
    const response = await background.transferEth(to, amount, Number(fee))
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
