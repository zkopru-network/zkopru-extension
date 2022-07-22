import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes'
import PrimaryButton from '../components/PrimaryButton'

const TransferCompletePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      Transaciton sent!
      <PrimaryButton onClick={() => navigate(ROUTES.HOME)}>
        Back to Home
      </PrimaryButton>
    </div>
  )
}

export default TransferCompletePage
