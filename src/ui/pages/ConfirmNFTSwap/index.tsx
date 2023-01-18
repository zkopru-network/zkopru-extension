import React, { useState } from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'
import { parsedNFTDetails } from '../Dashboard/NFTTab'

const ConfirmNFTSwapPage = ({ data }: { data: parsedNFTDetails }) => {
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
          Swap NFT
        </button>
      </div>
      <Modal
        opened={isOpen}
        closeModal={closeModal}
        title="Trade NFT?"
        mainAction={{
          label: '✨Accept trade✨',
          action: () => Promise.resolve(console.log('swap'))
        }}
      >
        <div className="flex flex-col gap-3 relative text-base">
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              you send
            </p>
            <div className="flex justify-center h-44 align-middle">
              <img
                src={data.imageSrc}
                alt={data.collectionName || 'Collection image'}
                className="pointer-events-none"
              />
            </div>
            <div className="p-2"></div>
            <div className="mx-auto text-center">
              <p className="font-semibold text-lg">#{data.tokenId}</p>
              <p>{data.collectionName}</p>
            </div>
          </div>
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              You Receive
            </p>
            <div className="flex justify-between items-center">
              <div className="rounded-full px-2 py-1 bg-skin-back text-xs text-skin-text-primary border border-skin-text-primary/40">
                from <span className="font-medium">{'0xabcD78...'}</span>
              </div>
              <p className="text-2xl font-medium">
                {'0.329'} {'USDC'}
              </p>
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

export default ConfirmNFTSwapPage
