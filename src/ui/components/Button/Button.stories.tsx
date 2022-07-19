import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '.'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      description:
        'The variant of the button, determines size and other styles',
      options: ['primary', 'secondary'],
      control: 'radio'
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button variant={args.variant}>{args.children}</Button>
)

export const Master = Template.bind({})

Master.args = {
  variant: 'primary',
  children: 'Click me'
}
