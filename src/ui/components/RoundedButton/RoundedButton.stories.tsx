import { ComponentStory, ComponentMeta } from '@storybook/react'

import RoundedButton from '.'

export default {
  title: 'Buttons/Rounded',
  component: RoundedButton
} as ComponentMeta<typeof RoundedButton>

const Template: ComponentStory<typeof RoundedButton> = (args) => (
  <RoundedButton variant={args.variant || 'base'}>
    {args.children}
  </RoundedButton>
)

export const Base = Template.bind({})

Base.args = {
  children: 'Click me'
}

export const Small = Template.bind({})
Small.args = {
  variant: 'small',
  children: 'Click me'
}
