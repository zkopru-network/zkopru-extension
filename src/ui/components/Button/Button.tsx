import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant: string
  size: string
}

interface Variants {
  primary: string
  secondary: string
}

interface Sizes {
  sm: string
  md: string
  lg: string
}

const defaulStyles =
  'rounded-lg text-gray-900 relative transition font-medium text-lg'

const variants: Variants = {
  primary: `${defaulStyles} bg-blue-400 hover:bg-blue-500`,
  secondary: `${defaulStyles} bg-gray-100 hover:bg-gray-200`
}

const sizes = {
  sm: 'p-2 text-xs',
  md: 'p-4 text-base',
  lg: 'p-6'
}

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'sm',
  ...rest
}) => (
  <button
    className={`${variants[variant as keyof Variants]} ${
      sizes[size as keyof Sizes]
    }`}
    {...rest}
  >
    {children}
  </button>
)

export default Button
