import { ComponentMeta, ComponentStory } from '@storybook/react'

import NetworkSwitcher from '.'

export default {
  title: 'Network Switcher',
  component: NetworkSwitcher
} as ComponentMeta<typeof NetworkSwitcher>

const Template: ComponentStory<typeof NetworkSwitcher> = () => (
  <div className="h-32 w-56 flex justify-center items-center">
    <NetworkSwitcher />
  </div>
)

export const Primary = Template.bind({})
