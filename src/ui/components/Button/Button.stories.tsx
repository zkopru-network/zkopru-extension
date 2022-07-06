import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './Button'

export default {
  title: 'Big Button',
  component: Button,
  argTypes: {
    variant: {
      description: 'The variant of the button',
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'tertiary'],
      control: 'radio'
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'radio'
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button variant={args.variant} size={args.size}>
    {args.children}
  </Button>
)

export const Primary = Template.bind({})

Primary.args = {
  variant: 'primary',
  children: 'Click me',
  size: 'md'
}
