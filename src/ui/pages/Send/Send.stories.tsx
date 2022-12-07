import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Send } from './index'
import ToastContainer from '../../components/Toast'

export default {
  title: 'Pages/Send',
  component: Send
} as ComponentMeta<typeof Send>

export const Playground: ComponentStory<typeof Send> = () => (
  <BrowserRouter>
    <ToastContainer />
    <Send
      onSubmit={() => {
        toast('submitted test')
      }}
      tokens={[
        {
          symbol: 'ETH',
          address: '0x0000000000000000000000000000000000000000',
          decimals: 18
        }
      ]}
    />
  </BrowserRouter>
)
