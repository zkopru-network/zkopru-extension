import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import clsx from 'clsx'
import { HomePage, TransferPage, UnlockPage, OnboardingPage } from './pages'
import { useStore } from './store'
import RequireOnboard from './helper/RequireOnboard'
import RequireAuth from './helper/RequireAuth'
import { globalStyle, container } from './globalStyle'
import {
  GetBalanceResponseMessageCreator,
  GetAddressResponseMessageCreator,
  UntypedMessage
} from '../share/message'
import { fromWei } from '../share/utils'
import { ROUTES } from '../share/constants'
import './i18n'
import { LightTheme } from './theme'

// Popup component responsible for
// - Initialize global state of UI
const Popup = () => {
  // TODO: dispatch initialization action
  // TODO: move to subscribe messages hook and call from Popup component
  const { setAddress, setBalance } = useStore()

  // TODO: use context to toggle theme light/dark
  const theme = LightTheme

  useEffect(() => {
    // initialization
    async function messageHandler(message: UntypedMessage) {
      if (GetAddressResponseMessageCreator.match(message)) {
        setAddress(message.payload.address)
      } else if (GetBalanceResponseMessageCreator.match(message)) {
        // e.g. store.dispatch(SOME_ACTION(message.balance))
        setBalance(fromWei(message.payload.balance))
      }
    }

    browser.runtime.onMessage.addListener(messageHandler)
  }, [])

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

const reactContainer = document.getElementById('popup') as HTMLElement
const root = createRoot(reactContainer)

root.render(<Popup />)
