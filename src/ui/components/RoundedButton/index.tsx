import React from 'react'
import { BtnProps, RoundedBtnVariants } from '../../interfaces'

const commonButtonStyles = `transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-1 focus:ring-offset-white font-medium rounded-full border-2 border-skin-light-gray/25`

const variants: RoundedBtnVariants = {
  primary: `text-sm py-1 px-3 text-white bg-btn-bright/60 hover:bg-btn-bright ${commonButtonStyles}`,
  secondary: `text-xs py-1 px-2 text-skin-light-gray bg-skin-light-gray/30 hover:bg-btn-bright hover:text-white ${commonButtonStyles}`
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
