import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Login } from '.'

export default {
  title: 'Pages/Login',
  component: Login
} as ComponentMeta<typeof Login>

export const Playground: ComponentStory<typeof Login> = () => <Login />
