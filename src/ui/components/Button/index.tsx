import React, { ReactNode } from 'react'

interface BtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  variant?: keyof BtnVariants
  icon?: JSX.Element
}

export interface BtnVariants {
  filled: string
  ghost: string
}

const commonButtonStyles = `transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-2 focus:ring-offset-white/50 font-semibold`

const variants: BtnVariants = {
  filled: `text-skin-text-primary bg-skin-light-gray hover:bg-btn-bright hover:text-white rounded-md py-4 px-6 ${commonButtonStyles}`,
  ghost: `text-skin-text-primary border-skin-text-primary border-2 bg-transparent hover:border-btn-bright hover:bg-btn-bright hover:text-white rounded-md py-2 px-4 ${commonButtonStyles}`
}

const Button: React.FC<BtnProps> = ({
  variant = 'filled',
  children = 'New button',
  icon,
  ...rest
}) => (
  <button {...rest} className={`${variants[variant as keyof BtnVariants]}`}>
    <div className="flex gap-2 text-inherit justify-center items-center capitalize">
      {children}
      {icon}
    </div>
  </button>
)

export default Button
