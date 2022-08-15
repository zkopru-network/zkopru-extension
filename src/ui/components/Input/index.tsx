import React from 'react'
import { Ref } from 'react'
import { InputProps } from '../../interfaces'
import { variants } from '../Button'

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
        <div className="flex flex-col gap-[6px]">
          {label && (
            <label htmlFor={id} className="text-sm">
              {label}
            </label>
          )}

          <input
            className={`rounded-md bg-skin-light-gray text-skin-text-primary border-2 border-skin-text-primary/33 shadow-sm focus:border-skin-text-primary focus:ring focus:ring-skin-text-primary focus:ring-opacity-60 peer ${
              error ? 'border-red-400/60' : ''
            }  ${addClasses ? addClasses : ''}`}
            type={type || 'text'}
            name={id}
            id={id}
            {...rest}
            ref={ref}
          />

          <p
            className={`text-xs bg-red-600/60 text-red-100 p-1 pl-2 rounded-sm tracking-wide ${
              error ? 'visible' : 'invisible'
            }`}
          >
            {error ? `⚠️ ${error}` : 'Something went wrong'}
          </p>
        </div>
      )
    }
  }
)

Input.displayName = 'Input'

export default Input
