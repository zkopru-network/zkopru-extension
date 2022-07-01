import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Button = ({
  children,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => (
  <button
    className="bg-gray-100 p-4 rounded-lg text-gray-900 relative"
    {...props}
  >
    {children}
    <span className="absolute animate-ping top-0 right-0 bg-red-500 rounded-full h-2 w-2"></span>
  </button>
)

export default Button
