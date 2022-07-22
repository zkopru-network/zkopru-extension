import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import ROUTES from '../../routes'

/**
 * check onboarding status and navigate to Onboarding route if not onboarded yet
 * accept same props type with Route element of react-router-dom
 */
const RequireOnboard = ({ children }: { children: JSX.Element }) => {
  const onboardingCompleted = useAuthStore((state) => state.onboardingCompleted)

  if (!onboardingCompleted) {
    return <Navigate to={ROUTES.ONBOARDING} replace />
  }

  return children
}

export default RequireOnboard
