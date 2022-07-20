import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '.'

import addCircleIcon from '../../../assets/in-app-icons/add-circle-line.svg'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      description:
        'The variant of the button, determines size and other styles',
      options: ['primary', 'ghost'],
      control: 'radio'
    },
    icon: {
      description: 'An icon to display on the button',
      options: ['None', 'Add circle line'],
      mapping: { None: undefined, 'Add circle line': addCircleIcon },
      control: {
        type: 'select'
        // labels: {
        //   addCircleIcon: 'Add Circle'
        // }
      }
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button variant={args.variant} icon={args.icon}>
    {args.children}
  </Button>
)

export const Primary = Template.bind({})

Primary.args = {
  variant: 'primary',
  children: 'Click me',
  icon: 'None'
}

export const Ghost = Template.bind({})
Ghost.args = {
  variant: 'ghost',
  children: 'Click me',
  icon: 'None'
}
