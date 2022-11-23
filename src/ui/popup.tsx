import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './app'
import { BackgroundContext, backgroundConnection } from './backgroundConnection'
import { TransferConfirmPage, SwapConfirmPage } from './pages'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { LightTheme } from './theme'
import clsx from 'clsx'

const queryClient = new QueryClient()

/*
const Popup = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundContext.Provider value={backgroundConnection}>
        <App />
      </BackgroundContext.Provider>
    </QueryClientProvider>
  )
}
*/

// Debug purpose
const Popup = () => {
  const theme = LightTheme

  return (
    <div className={clsx(theme, 'w-[464px]', 'h-[614px]')}>
      <Router>
        <SwapConfirmPage />
      </Router>
    </div>
  )
}

const reactContainer = document.getElementById('popup') as HTMLElement
const root = createRoot(reactContainer)

root.render(<Popup />)
