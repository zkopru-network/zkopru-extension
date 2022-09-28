import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from '.'

export default {
  title: 'Pages/Dashboard',
  component: Dashboard
} as ComponentMeta<typeof Dashboard>

export const Playground: ComponentStory<typeof Dashboard> = () => (
  <BrowserRouter>
    <Dashboard activities={[]} />
  </BrowserRouter>
)
