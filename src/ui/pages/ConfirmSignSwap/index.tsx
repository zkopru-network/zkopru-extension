import React from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'
import { ERC20Info } from '../../../share/types'
import { formatUnits } from '@ethersproject/units'

type Props = {
  onCancel: () => void
  handleSwap: () => Promise<void>
  sendAmount: string
  receiveAmount: string
  sendErc20?: ERC20Info
  receiveErc20?: ERC20Info
  fee: number
}

const ConfirmSignSwapPage = ({
  onCancel,
  handleSwap,
  sendAmount,
  sendErc20,
  receiveAmount,
  receiveErc20,
  fee
}: Props) => {
  return (
    <ExtensionFrame>
      <Modal
        opened
        closeModal={onCancel}
        title="Confirm swap"
        mainAction={{
          label: 'Sign Swap',
          action: handleSwap
        }}
      >
        <div className="flex flex-col gap-2.5 relative text-base">
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              Sign
            </p>
            <div className="flex justify-between">
              <p className="text-xl">{sendAmount}</p>
              <p className="font-medium">{sendErc20?.symbol || ''}</p>
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
              <p className="text-xl">{receiveAmount}</p>
              <p className="font-medium">{receiveErc20?.symbol || ''}</p>
            </div>
          </div>
          <p className="text-xs tracking-wide opacity-80 pt-2">
            Network fee: {formatUnits(fee, 'gwei')}
          </p>
        </div>
      </Modal>
    </ExtensionFrame>
  )
}

export default ConfirmSignSwapPage
