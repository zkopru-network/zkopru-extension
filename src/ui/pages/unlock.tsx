import React from 'react'
import { css } from '@linaria/core'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { ROUTES } from '../../share/constants'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const UnlockPage = () => {
  const navigate = useNavigate()
  const authenticate = useAuthStore((state) => state.authenticate)
  const handleSubmit = async () => {
    // TODO: check password
    authenticate()
    navigate(ROUTES.HOME)
  }

  return (
    <div className={container}>
      <h2>Unlock</h2>
      <input type="password" placeholder="password" />
      <PrimaryButton onClick={handleSubmit}>Unlock</PrimaryButton>
    </div>
  )
}

export default UnlockPage
