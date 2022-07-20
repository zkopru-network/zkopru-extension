import { ComponentStory, ComponentMeta } from '@storybook/react'

import RoundedButton from '.'

export default {
  component: RoundedButton,
  argTypes: {
    variant: {
      description:
        'The variant of the button, determines size and other styles',
      options: ['primary', 'secondary'],
      control: 'radio'
    }
  }
} as ComponentMeta<typeof RoundedButton>

const Template: ComponentStory<typeof RoundedButton> = (args) => (
  <RoundedButton variant={args.variant}>{args.children}</RoundedButton>
)

export const Primary = Template.bind({})

Primary.args = {
  variant: 'primary',
  children: 'Click me'
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  children: 'Click me'
}
