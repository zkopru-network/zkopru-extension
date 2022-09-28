import { useState } from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'

const ConfirmSwapPage = () => {
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
          Confirm swap
        </button>
      </div>
      <Modal
        opened={isOpen}
        closeModal={closeModal}
        title="Confirm swap"
        mainAction={{
          label: 'Confirm Swap',
          action: () => Promise.resolve(console.log('swap'))
        }}
      >
        <div className="flex flex-col gap-2.5 relative text-base">
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              Send
            </p>
            <div className="flex justify-between">
              <p className="text-xl">{'0.00293'}</p>
              <p className="font-medium">{'ETH'}</p>
            </div>
          </div>
          <div className="absolute left-1/2 top-[4.5rem] ring-1 ring-offset-transparent ring-skin-back ring-offset-4 h-8 w-8 bg-skin-light-gray text-skin-text-primary rounded-xl flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              Receive
            </p>
            <div className="flex justify-between">
              <p className="text-xl">{'0.329'}</p>
              <p className="font-medium">{'USDC'}</p>
            </div>
          </div>
          <p className="text-xs tracking-wide opacity-80 pt-2">
            Network fee: {'0.00000003'}
          </p>
        </div>
      </Modal>
    </ExtensionFrame>
  )
}

export default ConfirmSwapPage
