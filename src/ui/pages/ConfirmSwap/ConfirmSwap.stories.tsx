import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ConfirmSwapPage from '.'

export default {
  title: 'Pages/Swap',
  component: ConfirmSwapPage
} as ComponentMeta<typeof ConfirmSwapPage>

export const Playground: ComponentStory<typeof ConfirmSwapPage> = () => (
  <BrowserRouter>
    <ConfirmSwapPage />
  </BrowserRouter>
)
