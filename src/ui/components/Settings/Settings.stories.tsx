import { ComponentMeta, ComponentStory } from '@storybook/react'

import Settings from '.'

export default {
  title: 'Settings Menu',
  component: Settings
} as ComponentMeta<typeof Settings>

const Template: ComponentStory<typeof Settings> = () => (
  <div className="h-32 w-56 flex justify-center items-center">
    <Settings />
  </div>
)

export const Primary = Template.bind({})
