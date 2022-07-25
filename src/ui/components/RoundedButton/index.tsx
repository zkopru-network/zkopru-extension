import React, { ReactNode } from 'react'

interface BtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  variant?: keyof RoundedBtnVariants
}

export interface RoundedBtnVariants {
  primary: string
  secondary: string
}

const commonButtonStyles = `transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-1 focus:ring-offset-white font-medium rounded-full border-2 border-skin-light-gray/25`

const variants: RoundedBtnVariants = {
  primary: `text-base py-2 px-4 text-white bg-btn-bright/75 hover:bg-btn-bright ${commonButtonStyles}`,
  secondary: `text-xs py-1 px-2 text-skin-text-primary bg-skin-light-gray hover:bg-btn-bright hover:text-white ${commonButtonStyles}`
}

const RoundedButton: React.FC<BtnProps> = ({
  variant = 'primary',
  children = 'Click me',
  ...rest
}) => (
  <button
    {...rest}
    className={`${variants[variant as keyof RoundedBtnVariants]}`}
  >
    {children}
  </button>
)

export default RoundedButton
