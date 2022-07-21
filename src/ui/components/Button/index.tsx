import React, { ReactNode } from 'react'

interface BtnProps {
  children: ReactNode
  variant: string
  icon?: JSX.Element
}

export interface BtnVariants {
  primary: string
  ghost: string
}

const variants: BtnVariants = {
  primary: `text-skin-text-primary bg-skin-light-gray hover:bg-btn-bright hover:text-white transition font-semibold text-base rounded-md py-4 px-6 flex focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-2 focus:ring-offset-transparent`,
  ghost: `primary-light bg-btn-bright/33 transition font-medium text-xs rounded-full py-1 px-2 focus:outline-none focus:ring focus:ring-btn-bright/75 focus:ring-offset-1 text-gray-100`
}

const Button: React.FC<BtnProps> = ({
  variant = 'primary',
  children = 'New button',
  icon
}) => (
  <button className={`${variants[variant as keyof BtnVariants]}`}>
    <div className="flex gap-2 text-inherit justify-center items-center">
      {children}
      {icon}
    </div>
  </button>
)

export default Button
