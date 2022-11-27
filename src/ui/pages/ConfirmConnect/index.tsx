import React from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'

type Props = {
  handleConnect: () => Promise<void>
  handleClose: () => void
  origin: string
}

const ConfirmConnectPage = ({ handleConnect, handleClose, origin }: Props) => {
  return (
    <ExtensionFrame>
      <Modal
        opened
        closeModal={handleClose}
        title="Connect to this page?"
        mainAction={{
          label: 'Connect',
          action: handleConnect
        }}
      >
        <div className="flex flex-col gap-2.5 relative text-base">
          <p className="font-mono text-sm py-2 px-4 bg-skin-light-gray/60 rounded-md">
            {origin}
          </p>
        </div>
      </Modal>
    </ExtensionFrame>
  )
}

export default ConfirmConnectPage
