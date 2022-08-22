import React from 'react'
import { Ref } from 'react'
import { InputProps } from '../../interfaces'
import { variants } from '../Button'
import clsx from 'clsx'

const Input = React.forwardRef(
  (
    {
      label,
      type,
      id,
      error,
      extendClasses: addClasses,
      as,
      ...rest
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    if (type === 'submit')
      return (
        <input
          type={type}
          className={variants[as]}
          value={label}
          ref={ref}
          {...rest}
        />
      )
    else {
      return (
        <div className="flex flex-col gap-[5px]">
          {label && (
            <label htmlFor={id} className="text-sm">
              {label}
            </label>
          )}

          <input
            className={clsx(
              'rounded-md bg-skin-light-gray text-skin-text-primary border-2 border-skin-text-primary/33 shadow-sm focus:border-skin-text-primary focus:ring focus:ring-skin-text-primary focus:ring-opacity-60 peer placeholder:text-sm placeholder:text-skin-text-primary placeholder:opacity-60',
              error && 'border-red-400',
              addClasses
            )}
            type={type || 'text'}
            name={id}
            id={id}
            {...rest}
            ref={ref}
          />

          <div
            className={clsx(
              'text-xs bg-red-600/70  p-1 pl-2 rounded-sm tracking-wide flex',
              error ? 'visible' : 'invisible'
            )}
          >
            <p className="pr-2">⚠️</p>
            <p className="text-red-50">{error ? error : ''}</p>
          </div>
        </div>
      )
    }
  }
)

Input.displayName = 'Input'

export default Input
