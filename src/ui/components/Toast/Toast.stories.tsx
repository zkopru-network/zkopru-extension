import { ComponentMeta, ComponentStory } from '@storybook/react'
import toast from 'react-hot-toast'

import ToastContainer from '.'
import { Filled } from '../Button/Button.stories'
import ExtensionFrame from '../ExtensionFrame'

export default {
  title: 'Toast',
  component: ToastContainer
} as ComponentMeta<typeof ToastContainer>

const Template: ComponentStory<typeof ToastContainer> = () => {
  const showToast = () => toast('Test message yooooo...')
  const showToastWithIcon = () =>
    toast('Test message with icon', {
      icon: '✨'
    })
  const showLoadingToast = () => toast.loading('Processing transaction ...')

  return (
    <ExtensionFrame>
      {/* Docs say put this at the top but my component display at the bottom */}
      <ToastContainer />

      {/* Buttons to trigger toasts */}
      <Filled variant="filled" onClick={showToast}>
        Show regular toast
      </Filled>
      <Filled variant="filled" onClick={showToastWithIcon}>
        Show toast with icon
      </Filled>
      <Filled variant="filled" onClick={showLoadingToast}>
        Show loading toast
      </Filled>
      <Filled variant="ghost" onClick={() => toast.dismiss()}>
        Remove all
      </Filled>
    </ExtensionFrame>
  )
}

export const Playground = Template.bind({})
