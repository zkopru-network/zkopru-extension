import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import Button from '../Button'
import RoundedButton from '../RoundedButton'

const Modal = ({
  opened,
  closeModal,
  title,
  children,
  mainAction,
  cancellable = true
}: {
  opened: boolean
  closeModal: () => void
  mainAction?: { label: string; action: () => Promise<void> }
  title: string
  cancellable?: boolean
  children: ReactNode
}) => {
  return (
    <>
      <Transition appear show={opened} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-mode-pure bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mode-pure p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-skin-text-primary"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-4">{children}</div>

                  <div className="mt-8 flex justify-between items-baseline">
                    {cancellable && (
                      <RoundedButton variant="primary" onClick={closeModal}>
                        Cancel
                      </RoundedButton>
                    )}

                    {mainAction && (
                      <Button variant="filled" onClick={mainAction.action}>
                        {mainAction.label}
                      </Button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
