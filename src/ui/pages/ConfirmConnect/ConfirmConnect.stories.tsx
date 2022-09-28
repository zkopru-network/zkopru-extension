import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ConfirmConnectPage from '.'

export default {
  title: 'Confirmations/Connect',
  component: ConfirmConnectPage
} as ComponentMeta<typeof ConfirmConnectPage>

export const Playground: ComponentStory<typeof ConfirmConnectPage> = () => (
  <BrowserRouter>
    <ConfirmConnectPage />
  </BrowserRouter>
)
