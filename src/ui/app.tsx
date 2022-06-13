import React, { useEffect, useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import clsx from 'clsx'
import {
  HomePage,
  TransferPage,
  UnlockPage,
  OnboardingPage,
  LoadingPage
} from './pages'
import RequireOnboard from './helper/RequireOnboard'
import RequireAuth from './helper/RequireAuth'
import { checkUnlockNeeded } from './helper/unlockNeeded'
import { globalStyle, container } from './globalStyle'
import { BACKGROUND_STATUS, ROUTES } from '../share/constants'
import { LightTheme } from './theme'
import { useAuthStore } from './store/auth'
import useBackgroundConnection from './hooks/useBackgroundConnection'
import './i18n'

// Application component responsible for
// - Initialize global state of UI
const App = () => {
  // TODO: use context to toggle theme light/dark
  const theme = LightTheme
  const { onboardingCompleted, setOnboardingCompleted, setAuthenticated } =
    useAuthStore()
  const background = useBackgroundConnection()
  const [loading, setLoading] = useState(true)

  // check background status and set auth state
  useEffect(() => {
    async function loadBackgroundStatus() {
      const status = await background.getBackgroundStatus()
      console.log(status)

      if (status !== BACKGROUND_STATUS.INITIALIZING) {
        if (status === BACKGROUND_STATUS.NOT_ONBOARDED) {
          setOnboardingCompleted(false)
        } else {
          setOnboardingCompleted(true)
        }

        const unlockNeeded = await checkUnlockNeeded()
        console.log('unlock needed', unlockNeeded)
        setAuthenticated(!unlockNeeded)
        setLoading(false)
      } else {
        setTimeout(loadBackgroundStatus, 1000)
        // fetch again after a second
      }
    }

    loadBackgroundStatus()
  }, [])

  useEffect(() => {
    // TODO: dispatch initialization action
    // TODO: check if background client is ready or not
    if (onboardingCompleted) {
      background.syncBalance()
      background.syncZkAddress()
    }
  }, [onboardingCompleted])

  if (loading) return <LoadingPage />

  return (
    <div className={clsx(theme, globalStyle, container)}>
      <Router>
        <Routes>
          <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
          <Route
            path={ROUTES.UNLOCK}
            element={
              <RequireOnboard>
                <UnlockPage />
              </RequireOnboard>
            }
          />

          <Route
            path={ROUTES.HOME}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.TRANSFER}
            element={
              <RequireAuth>
                <TransferPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
