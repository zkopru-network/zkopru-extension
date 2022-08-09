import React from 'react'
import { InputProps } from '../../interfaces'
import { variants } from '../Button'

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  error,
  extendClasses: addClasses,
  as,
  ...rest
}) => {
  if (type === 'submit')
    return <input type={type} className={variants[as]} value={label} />
  else {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        )}

        <input
          className={`rounded-md bg-skin-light-gray text-skin-text-primary border border-skin-text-primary/33 shadow-sm focus:border-skin-text-primary focus:ring focus:ring-skin-text-primary focus:ring-opacity-60 invalid:border invalid:border-red-600/60 focus:invalid:border-red-600/75 focus:invalid:ring-red-500/75 peer ${addClasses}`}
          type={type || 'text'}
          name={id}
          id={id}
          {...rest}
        />

        {error && (
          <p className="text-xs bg-red-600/60 text-red-100 p-1 pl-2 rounded-sm tracking-wide">
            {error}
          </p>
        )}
      </div>
    )
  }
}

export default Input
