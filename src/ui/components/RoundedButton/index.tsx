import clsx from 'clsx'
import React from 'react'
import { BtnProps, RoundedBtnVariants } from '../../interfaces'

const commonButtonStyles = `transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-btn-bright/50 focus:ring-offset-1 focus:ring-offset-white font-medium rounded-full border-2 border-skin-light-gray/25`

const variants: RoundedBtnVariants = {
  primary: `text-sm py-1 px-3 text-white bg-btn-bright/60 hover:bg-btn-bright ${commonButtonStyles}`,
  secondary: `text-xs py-1 px-2 text-skin-text-primary bg-skin-light-gray/80 border border-skin-inverse/20 hover:bg-btn-bright hover:text-white hover:border-btn-bright backdrop-blur-sm ${commonButtonStyles}`
}

const RoundedButton: React.FC<BtnProps> = ({
  variant = 'primary',
  children = 'Click me',
  addClasses,
  ...rest
}) => (
  <button
    {...rest}
    className={clsx(
      `${variants[variant as keyof RoundedBtnVariants]}`,
      addClasses
    )}
  >
    {children}
  </button>
)

export default RoundedButton
