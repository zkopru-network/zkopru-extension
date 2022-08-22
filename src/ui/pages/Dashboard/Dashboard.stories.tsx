import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Dashboard } from '.'

export default {
  title: 'Pages/Dashboard',
  component: Dashboard
} as ComponentMeta<typeof Dashboard>

export const Playground: ComponentStory<typeof Dashboard> = () => <Dashboard />
