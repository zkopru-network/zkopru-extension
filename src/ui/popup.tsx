import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './app'
import { BackgroundContext, backgroundConnection } from './backgroundConnection'

const queryClient = new QueryClient()

const Popup = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundContext.Provider value={backgroundConnection}>
        <App />
      </BackgroundContext.Provider>
    </QueryClientProvider>
  )
}

const reactContainer = document.getElementById('popup') as HTMLElement
const root = createRoot(reactContainer)

root.render(<Popup />)
