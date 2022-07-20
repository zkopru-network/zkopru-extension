import React, { ReactNode } from 'react'

interface BtnProps {
  children: ReactNode
  variant: string
}

interface BtnVariants {
  primary: string
  secondary: string
}

const variants: BtnVariants = {
  primary: `bg-btn-primary/33 hover:bg-btn-primary transition font-medium text-base text-white rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-btn-primary/50 focus:ring-offset-2`,
  secondary: `primary-light bg-bt-primary/33 transition font-medium text-xs rounded-full py-1 px-2 focus:outline-none focus:ring focus:ring-bt-primary/75 focus:ring-offset-1`
}

const Button: React.FC<BtnProps> = ({
  variant = 'primary',
  children = 'Click me'
}) => (
  <button className={`${variants[variant as keyof BtnVariants]}`}>
    {children}
  </button>
)

export default Button
