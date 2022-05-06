// Entry point of popup component
import * as React from 'react'
import { createRoot } from 'react-dom/client'

const Popup = () => {
  return (
    <div>
      This is Popup
      <button onClick={() => console.log('Button clicked')}>Click me!</button>
    </div>
  )
}

const container = document.getElementById('popup')
const root = createRoot(container)

root.render(<Popup />)
