import { useState } from 'react'
import { ArrowDownSFill, ZkopruLogo } from './icons'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex justify-between items-center text-xs text-skin-text-primary">
      <ZkopruLogo />
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-300/30 flex items-center gap-2 rounded-full px-2 py-1"
        >
          <span className="bg-green-300 rounded-full p-1 shadow-lg shadow-green-600"></span>
          <p>Optimism testnet</p>
          <ArrowDownSFill className="text-skin-text-primary/70" />
        </button>
        {isOpen && (
          <div className="absolute top-0 right-0 mt-7 mr-2 bg-white p-2 flex flex-col shadow-sm rounded-md text-skin-text-primary/80 font-medium">
            <a href="#" className="py-1 px-2">
              Goerli
            </a>
            <a href="#" className="py-1 px-2">
              Optimism
            </a>
          </div>
        )}
      </div>
      <p>Settings</p>
    </div>
  )
}
