import React, { ReactNode } from 'react'

interface BtnProps {
  children: ReactNode
  variant: string
}

export interface RoundedBtnVariants {
  primary: string
  secondary: string
}

const variants: RoundedBtnVariants = {
  // primary: `text-skin-primary bg-skin-light-gray hover:bg-btn-primary hover:text-white transition font-semibold rounded-md text-base rounded-4 py-4 px-6 flex focus:outline-none focus:ring focus:ring-btn-primary/50 focus:ring-offset-2`,
  primary: `bg-btn-bright/33 hover:bg-btn-bright transition font-medium text-base text-white rounded-full py-2 px-4 focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-2`,
  secondary: `primary-light bg-btn-bright/33 transition font-medium text-xs rounded-full py-1 px-2 focus:outline-none focus:ring focus:ring-btn-bright/75 focus:ring-offset-1 text-gray-100`
}

const RoundedButton: React.FC<BtnProps> = ({
  variant = 'primary',
  children = 'Click me'
}) => (
  <button className={`${variants[variant as keyof RoundedBtnVariants]}`}>
    {children}
  </button>
)

export default RoundedButton
