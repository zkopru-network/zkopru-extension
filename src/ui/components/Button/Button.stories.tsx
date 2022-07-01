import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './Button'

export default {
  title: 'Buttons/Big Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button>My First Button</Button>
)

export const Primary = Template.bind({})
