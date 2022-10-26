import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Onboarding } from './index'

export default {
  title: 'Pages/Onboarding',
  component: Onboarding
} as ComponentMeta<typeof Onboarding>

export const Playground: ComponentStory<typeof Onboarding> = () => (
  <Onboarding onSubmit={() => null} />
)
