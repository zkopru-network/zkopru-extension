import React, { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import clsx from 'clsx'
import {
  HomePage,
  TransferPage,
  TransferConfirmPage,
  TransferCompletePage,
  UnlockPage,
  OnboardingPage,
  LoadingPage,
  WithdrawPage,
  WithdrawCompletePage,
  ActivityPage,
  ConfirmConnectionPage
} from './pages'
import RequireOnboard from './helper/RequireOnboard'
import RequireAuth from './helper/RequireAuth'
import { checkUnlockNeeded } from './helper/unlockNeeded'
import { globalStyle, container } from './globalStyle'
import { BACKGROUND_STATUS, ONBOARDING_URL, ROUTES } from '../share/constants'
import { LightTheme } from './theme'
import { useAuthStore } from './store/auth'
import useBackgroundConnection from './hooks/useBackgroundConnection'
import './i18n'

// Application component responsible for
// - Initialize global state of UI
const App = () => {
  // TODO: use context to toggle theme light/dark
  const theme = LightTheme
  const {
    onboardingCompleted,
    setOnboardingCompleted,
    setAuthenticated,
    setRedirectParams,
    setRedirectPath
  } = useAuthStore()
  const background = useBackgroundConnection()
  const [loading, setLoading] = useState(true)

  // check background status and set auth state
  useEffect(() => {
    async function loadBackgroundStatus() {
      const status = await background.getBackgroundStatus()

      if (
        status !== BACKGROUND_STATUS.STARTINGUP &&
        status !== BACKGROUND_STATUS.LOADING
      ) {
        if (status === BACKGROUND_STATUS.NOT_ONBOARDED) {
          setOnboardingCompleted(false)
        } else if (status === BACKGROUND_STATUS.NEED_KEY_GENERATION) {
          setOnboardingCompleted(false)
          // open connect and sign page and get signature
          // search tabs and if onboarding page exists, focus the tab
          // TODO:  localhost is not valid query string. comment in next line after deploy onboarding page
          // const tabs = await browser.tabs.query({ url: ONBOARDING_URL })
          const tabs: browser.Tabs.Tab[] = []
          if (tabs.length === 0) {
            open(ONBOARDING_URL)
          } else {
            browser.tabs.update(tabs[0].id, { active: true })
          }
          window.close()
        } else {
          setOnboardingCompleted(true)
        }

        const unlockNeeded = await checkUnlockNeeded()
        if (unlockNeeded) {
          setRedirectPath(window.location.hash.slice(1))
          setRedirectParams(window.location.search)
        }
        setAuthenticated(!unlockNeeded)
        setLoading(false)
      } else {
        setLoading(true)
        setTimeout(loadBackgroundStatus, 1000)
      }
    }

    loadBackgroundStatus()
  }, [])

  useEffect(() => {
    // TODO: dispatch initialization action
    // TODO: check if background client is ready or not
    if (onboardingCompleted) {
      background.syncZkAddress()
    }
  }, [onboardingCompleted])

  // periodically fetch balance
  useEffect(() => {
    function pollBalance() {
      setTimeout(async () => {
        const onboardingCompleted = useAuthStore.getState().onboardingCompleted
        if (onboardingCompleted) background.syncBalance()
        pollBalance()
      }, 3000)
    }
    pollBalance()
  }, [])

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
          <Route
            path={ROUTES.TRANSFER_CONFIRM}
            element={
              <RequireAuth>
                <TransferConfirmPage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.TRANFER_COMPLETE}
            element={
              <RequireAuth>
                <TransferCompletePage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.WITHDRAW}
            element={
              <RequireAuth>
                <WithdrawPage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.WITHDRAW_COMPLETE}
            element={
              <RequireAuth>
                <WithdrawCompletePage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.ACTIVITY}
            element={
              <RequireAuth>
                <ActivityPage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.CONFIRM_CONNECTION}
            element={
              <RequireAuth>
                <ConfirmConnectionPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
