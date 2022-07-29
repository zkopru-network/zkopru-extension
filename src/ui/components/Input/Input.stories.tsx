import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from '.'

export default {
  title: 'Input',
  component: Input
} as ComponentMeta<typeof Input>

export const Text: ComponentStory<typeof Input> = () => (
  <Input label="Test label" id="testlabel"></Input>
)

export const Password: ComponentStory<typeof Input> = (args) => {
  const { id, ...rest } = args
  return <Input label="Password" id={id} type="password" {...rest}></Input>
}
