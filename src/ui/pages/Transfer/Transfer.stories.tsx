import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Transfer } from './index'

export default {
  title: 'Pages/Transfer',
  component: Transfer
} as ComponentMeta<typeof Transfer>

export const Playground: ComponentStory<typeof Transfer> = () => <Transfer />
