import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TokenSelector } from '.'

export default {
  title: 'Token Selector',
  component: TokenSelector
} as ComponentMeta<typeof TokenSelector>

export const Playground: ComponentStory<typeof TokenSelector> = () => (
  <div className="max-w-sm h-44">
    <p className="mb-2 text-sm">
      <span className="opacity-70 font-semibold">Hint:</span> Click below
    </p>
    <TokenSelector
      onBlur={() => null}
      onChange={() => null}
      value="ETH"
      name="token"
    />
  </div>
)
