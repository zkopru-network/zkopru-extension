import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { BackgroundContext, backgroundConnection } from './backgroundConnection'

const Popup = () => {
  return (
    <BackgroundContext.Provider value={backgroundConnection}>
      <App />
    </BackgroundContext.Provider>
  )
}

const reactContainer = document.getElementById('popup') as HTMLElement
const root = createRoot(reactContainer)

root.render(<Popup />)
