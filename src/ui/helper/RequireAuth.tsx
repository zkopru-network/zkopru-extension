import React from 'react'
import { Navigate } from 'react-router-dom'
import shallow from 'zustand/shallow'
import { useAuthStore } from '../store/auth'
import { ROUTES } from '../../share/constants'

/**
 * check onboarding status and authentication status and navigate to
 * appropriate route
 * accept same props type with Route element of react-router-dom
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { authenticated, onboardingCompleted } = useAuthStore(
    (state) => ({
      authenticated: state.authenticated,
      onboardingCompleted: state.onboardingCompleted
    }),
    shallow
  )

  if (!onboardingCompleted) {
    return <Navigate to={ROUTES.ONBOARDING} replace />
  }

  if (!authenticated) {
    return <Navigate to={ROUTES.UNLOCK} replace />
  }

  return children
}

export default RequireAuth
