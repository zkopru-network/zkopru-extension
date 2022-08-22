import { Listbox, Transition } from '@headlessui/react'
import { useState } from 'react'
import { TokenSelectorProps } from '../../interfaces'
import { ArrowDownSFill } from '../common/icons'

/**
 * The token selector component
 * @tutorial Wrap with `Controller` component in a `react-hook-form` form
 * @see https://react-hook-form.com/api/usecontroller/controller
 * @example
 * ```tsx
 * <Controller
 *  control={control}
 *  name="token"
 *  defaultValue="ETH"
 *  render={({ field: { onChange, onBlur, value, name, ref } }) => (
 *    <TokenSelector
 *      onBlur={onBlur}
 *      onChange={onChange}
 *      value={value}
 *      inputRef={ref}
 *      name={name}
 *    />
 *  )}/>
 * ```
 */
export const TokenSelector = ({
  onChange,
  value,
  inputRef,
  data
}: TokenSelectorProps) => {
  const [selectedToken, setSelectedToken] = useState(value)

  return (
    <Listbox
      value={value}
      onChange={(token) => {
        setSelectedToken(token)
        onChange(token)
      }}
    >
      <div className="relative">
        <Listbox.Button className="w-full rounded-md bg-skin-light-gray text-skin-text-primary border-2 border-skin-text-primary/33 shadow-sm focus:border-skin-text-primary focus:ring focus:ring-skin-text-primary focus:ring-opacity-60 text-left py-2 px-3 flex justify-between items-center">
          {selectedToken}
          <ArrowDownSFill className="text-skin-text-primary/70" />
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-skin-light-gray p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            ref={inputRef}
          >
            {data.map((token) => (
              <Listbox.Option key={token.id} value={token.symbol}>
                {({ active, selected }) => (
                  <div
                    className={`${
                      active
                        ? 'bg-btn-bright text-white'
                        : 'text-skin-text-primary'
                    } flex gap-2 cursor-pointer rounded-md py-1 relative`}
                  >
                    {/* TODO: Replace with token icon images */}
                    <div>{token.icon}</div>
                    <p className="text-current">{token.symbol}</p>
                    {selected && <p className="absolute right-2">✅</p>}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
