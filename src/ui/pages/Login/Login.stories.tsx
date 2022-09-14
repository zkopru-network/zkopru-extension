import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Login } from './index'

export default {
  title: 'Pages/Login',
  component: Login
} as ComponentMeta<typeof Login>

export const Playground: ComponentStory<typeof Login> = () => (
  <Login onSubmit={console.log} />
)
