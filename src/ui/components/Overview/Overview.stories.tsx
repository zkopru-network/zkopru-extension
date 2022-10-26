import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Overview } from '.'
import ExtensionFrame from '../ExtensionFrame'

export default {
  title: 'Overview',
  component: Overview
} as ComponentMeta<typeof Overview>

export const Playground: ComponentStory<typeof Overview> = () => (
  <ExtensionFrame>
    <BrowserRouter>
      <Overview />
    </BrowserRouter>
  </ExtensionFrame>
)
