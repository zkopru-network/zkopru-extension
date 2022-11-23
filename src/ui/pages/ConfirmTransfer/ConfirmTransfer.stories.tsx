import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ConfirmTransferPage from '.'

export default {
  title: 'Confirmations/Transfer',
  component: ConfirmTransferPage
} as ComponentMeta<typeof ConfirmTransferPage>

export const Playground: ComponentStory<typeof ConfirmTransferPage> = () => {
  return (
    <BrowserRouter>
      <ConfirmTransferPage
        onCancel={() => {
          console.log('cancel')
        }}
        handleTransfer={async () => {
          console.log('transfer clicked')
        }}
        formattedAmount={'1.2345'}
        erc20={{
          address: '0x00',
          decimals: 18,
          symbol: 'ETH'
        }}
        fee={2400}
      />
    </BrowserRouter>
  )
}
