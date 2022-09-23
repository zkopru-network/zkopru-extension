import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import Modal from '.'
import ExtensionFrame from '../ExtensionFrame'

export default {
  title: 'Modal',
  component: Modal
} as ComponentMeta<typeof Modal>

export const Playground: ComponentStory<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false)

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
        title="Test Modal"
        mainAction={{
          label: 'Log test message',
          action: () => Promise.resolve(console.log('clicked'))
        }}
      >
        <p className="text-sm text-skin-text-primary/80">
          Your payment has been successfully submitted. We’ve sent you an email
          with all of the details of your order.
        </p>
      </Modal>
    </ExtensionFrame>
  )
}
