import React from 'react'
import { css } from '@linaria/core'
import PrimaryButton from '../components/PrimaryButton'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const TransferPage = () => {
  const confirm = async () => {
    console.log('transfer clicked')
  }

  return (
    <div className={container}>
      <h1>Transfer</h1>
      <PrimaryButton onClick={confirm}>Confirm</PrimaryButton>
    </div>
  )
}

export default TransferPage
