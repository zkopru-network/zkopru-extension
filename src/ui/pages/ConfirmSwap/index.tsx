import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../../routes'
import ExtensionFrame from '../../components/ExtensionFrame'
import Modal from '../../components/Modal'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'

const ConfirmSwapPage = () => {
  // // TODO: validation
  // const navigate = useNavigate()
  // const background = useBackgroundConnection()

  // // TODO: get params once
  // const {
  //   sendToken,
  //   sendAmount,
  //   receiveToken,
  //   receiveAmount,
  //   counterParty,
  //   salt,
  //   fee
  // } = new Proxy(new URLSearchParams(window.location.search), {
  //   get: (searchParams, prop) => searchParams.get(prop as string)
  // }) as any
  // const [loading, setLoading] = useState(false)

  // const handleSwap = useCallback(async () => {
  //   setLoading(true)
  //   const response = await background.swap(
  //     sendToken,
  //     sendAmount,
  //     receiveToken,
  //     receiveAmount,
  //     counterParty,
  //     Number(salt),
  //     fee
  //   )
  //   if (response.payload.hash) navigate(routes.SWAP_COMPLETE)
  // }, [])

  // if (loading) {
  //   return (
  //     <div>
  //       <h1>Sending transaction...</h1>
  //     </div>
  //   )
  // }

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
          Open dialog
        </button>
      </div>
      <Modal
        opened={isOpen}
        closeModal={closeModal}
        title="Confirm swap"
        mainAction={{
          label: 'Swap',
          action: () => Promise.resolve(console.log('swap'))
        }}
      >
        <div className="flex flex-col gap-2 relative text-base">
          <div className="p-4 bg-skin-light-gray/50 rounded-lg">
            <p className="uppercase font-medium text-xs tracking-wide mb-2 opacity-80">
              Send
            </p>
            <div className="flex justify-between">
              <p className="text-xl">{'0.00293'}</p>
              <p className="font-medium">{'ETH'}</p>
            </div>
          </div>
          <div className="absolute left-3 top-1/2 ring-2 ring-mode-pure ring-offset-2 h-6 w-6 bg-skin-light-gray text-skin-text-primary text-center rounded-full">
            ↓
          </div>
          <div className="flex p-4 bg-skin-light-gray/50 rounded-lg">
            <p>
              Receive {'0.329'} {'USDC'}
            </p>
          </div>
          <p className="text-xs tracking-wide opacity-80 pt-2">
            Network fee: {'0.00000003'}
          </p>
        </div>
      </Modal>
    </ExtensionFrame>
  )
}

// const container = css`
//   display: flex;
//   flex-direction: column;
//   padding: 12px 24px;
//   overflow-y: scroll;
// `

// const buttonSection = css`
//   display: flex;
//   justify-content: space-between;
// `
export default ConfirmSwapPage
