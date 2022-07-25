import React, { ReactNode } from 'react'

interface BtnProps {
  children: ReactNode
  variant?: keyof RoundedBtnVariants
}

export interface RoundedBtnVariants {
  base: string
  small: string
}

const variants: RoundedBtnVariants = {
  base: `bg-btn-bright/33 hover:bg-btn-bright transition font-medium text-base text-white rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-2`,
  small: `primary-light bg-btn-bright/33 transition font-medium text-xs rounded-full py-1 px-2 focus:outline-none focus:ring focus:ring-btn-bright/75 focus:ring-offset-1 text-gray-100`
}

const RoundedButton: React.FC<BtnProps> = ({
  variant = 'base',
  children = 'Click me'
}) => (
  <button className={`${variants[variant as keyof RoundedBtnVariants]}`}>
    {children}
  </button>
)

export default RoundedButton
