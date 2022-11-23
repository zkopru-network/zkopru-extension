import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ConfirmSwapPage from '.'

export default {
  title: 'Confirmations/Swap',
  component: ConfirmSwapPage
} as ComponentMeta<typeof ConfirmSwapPage>

export const Playground: ComponentStory<typeof ConfirmSwapPage> = () => (
  <BrowserRouter>
    <ConfirmSwapPage
      onCancel={() => {
        console.log('cancel')
      }}
      handleSwap={async () => {
        console.log('swap clicked')
      }}
      sendAmount={'1.2345'}
      receiveAmount={'23.45'}
      sendErc20={{
        address: '0x00',
        decimals: 18,
        symbol: 'ETH'
      }}
      receiveErc20={{
        address: '0x00',
        decimals: 18,
        symbol: 'DAI'
      }}
      fee={2400}
    />
  </BrowserRouter>
)
