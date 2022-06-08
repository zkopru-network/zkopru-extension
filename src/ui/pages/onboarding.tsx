import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import shallow from 'zustand/shallow'
import { useAuthStore } from '../store/auth'
import PrimaryButton from '../components/PrimaryButton'
import { ROUTES } from '../../share/constants'

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

  const handleSubmit = () => {
    completeOnboarding()
    setAuthenticated(true)
    navigate(ROUTES.HOME)
  }

  return (
    <div>
      <h2>Onboarding</h2>
      <input type="password" placeholder="password" />
      <PrimaryButton onClick={handleSubmit}>{t('register')}</PrimaryButton>
    </div>
  )
}

export default OnboardingPage
