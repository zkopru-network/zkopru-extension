import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Send } from './index'

export default {
  title: 'Pages/Send',
  component: Send
} as ComponentMeta<typeof Send>

export const Playground: ComponentStory<typeof Send> = () => (
  <BrowserRouter>
    <Send
      onSubmit={() => console.log('submitted test')}
      tokens={[
        { symbol: 'ETH', address: '0x00000000000000000000', decimals: 18 }
      ]}
    />
  </BrowserRouter>
)
