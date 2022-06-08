import React from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'
import { ROUTES } from '../../share/constants'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const TransferPage = () => {
  const navigate = useNavigate()
  const confirm = async () => {
    console.log('transfer clicked')
    navigate(ROUTES.HOME)
  }

  return (
    <div className={container}>
      <h1>Transfer</h1>
      <PrimaryButton onClick={confirm}>Transfer</PrimaryButton>
    </div>
  )
}

export default TransferPage
