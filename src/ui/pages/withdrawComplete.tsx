import React from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../share/constants'
import PrimaryButton from '../components/PrimaryButton'

const WithdrawCompletePage = () => {
  const navigate = useNavigate()
  return (
    <div className={container}>
      Withdraw transaction sent!
      <PrimaryButton onClick={() => navigate(ROUTES.HOME)}>
        Back to Home
      </PrimaryButton>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  overflow-y: scroll;
`

export default WithdrawCompletePage
