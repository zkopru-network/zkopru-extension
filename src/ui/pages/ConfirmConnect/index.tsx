import React, { useState } from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'

const ConfirmConnectPage = () => {
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <ExtensionFrame>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-btn-bright px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Connect wallet
        </button>
      </div>
      <Modal
        opened={isOpen}
        closeModal={closeModal}
        title="Connect to this page?"
        mainAction={{
          label: 'Connect',
          action: () => Promise.resolve(console.log('swap'))
        }}
      >
        <div className="flex flex-col gap-2.5 relative text-base">
          <p className="font-mono text-sm py-2 px-4 bg-skin-light-gray/60 rounded-md">
            {'http://localhost:3000'}
          </p>
        </div>
      </Modal>
    </ExtensionFrame>
  )
}

export default ConfirmConnectPage
