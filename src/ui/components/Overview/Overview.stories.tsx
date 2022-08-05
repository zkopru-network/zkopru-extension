import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Overview } from '.'
import ExtensionFrame from '../ExtensionFrame'

export default {
  title: 'Overview',
  component: Overview
} as ComponentMeta<typeof Overview>

export const Playground: ComponentStory<typeof Overview> = () => (
  <ExtensionFrame>
    <Overview />
  </ExtensionFrame>
)
