import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import shallow from 'zustand/shallow'
import { useAuthStore } from '../store/auth'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import PrimaryButton from '../components/PrimaryButton'
import { Input } from '../components/Form'
import { ROUTES } from '../../share/constants'
import { css } from '@linaria/core'

const OnboardingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { completeOnboarding, setAuthenticated } = useAuthStore(
    (state) => ({
      completeOnboarding: state.completeOnboarding,
      setAuthenticated: state.setAuthenticated
    }),
    shallow
  )
  const background = useBackgroundConnection()
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    // TODO: add loading state

    await background.registerPassword(password)

    completeOnboarding()
    setAuthenticated(true)
    navigate(ROUTES.HOME)
  }

  return (
    <div>
      <h2>{t('onboarding')}</h2>
      <div className={body}>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton onClick={handleSubmit}>{t('register')}</PrimaryButton>
      </div>
    </div>
  )
}

const body = css`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
`

export default OnboardingPage
