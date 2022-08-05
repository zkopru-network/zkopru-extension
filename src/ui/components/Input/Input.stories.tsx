import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from '.'

export default {
  title: 'Input',
  component: Input
} as ComponentMeta<typeof Input>

export const Text: ComponentStory<typeof Input> = () => (
  <Input type="text" label="Test label" id="testlabel" />
)

export const Password: ComponentStory<typeof Input> = (args) => {
  return <Input type="password" label={args.label} id={args.id} />
}
Password.args = {
  label: 'Password',
  id: 'password'
}

export const Submit: ComponentStory<typeof Input> = (args) => {
  return <Input type="submit" label={args.label} id={args.label} as={'ghost'} />
}
