import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from '.'

export default {
  title: 'Input',
  component: Input
} as ComponentMeta<typeof Input>

export const Text: ComponentStory<typeof Input> = () => (
  <Input type="text" label="Test label" id="testlabel" />
)

export const Password: ComponentStory<typeof Input> = () => {
  return <Input type="password" label="Password" id={'password'} />
}

export const Submit: ComponentStory<typeof Input> = (args) => {
  return <Input type="submit" label={args.label} id={'submit'} as={'ghost'} />
}
