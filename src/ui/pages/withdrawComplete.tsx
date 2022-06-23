import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../share/constants'
import PrimaryButton from '../components/PrimaryButton'

const WithdrawCompletePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      Withdraw transaction sent!
      <PrimaryButton onClick={() => navigate(ROUTES.HOME)}>
        Back to Home
      </PrimaryButton>
    </div>
  )
}

export default WithdrawCompletePage
