import React from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'
import { ERC20Info } from '../../../share/types'

type Props = {
  onCancel: () => void
  handleTransfer: () => Promise<void>
  formattedAmount: string
  erc20?: ERC20Info
  fee: number
}

// TODO: add loading state to tx
const ConfirmTransferPage = ({
  onCancel,
  handleTransfer,
  formattedAmount,
  erc20,
  fee
}: Props) => {
  return (
    <ExtensionFrame>
      <Modal
        opened
        closeModal={onCancel}
        title="Confirm Transfer"
        mainAction={{
          label: 'Confirm Transfer',
          action: handleTransfer
        }}
      >
        <div className="flex flex-col gap-2.5 relative text-base">
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              Send
            </p>
            <div className="flex justify-between">
              <p className="text-xl">{formattedAmount}</p>
              <p className="font-medium">{erc20?.symbol || ''}</p>
            </div>
          </div>
          <p className="text-xs tracking-wide opacity-80 pt-2">
            Network fee: {fee}
          </p>
        </div>
      </Modal>
    </ExtensionFrame>
  )
}

export default ConfirmTransferPage
