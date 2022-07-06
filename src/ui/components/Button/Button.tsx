import React, { ReactNode } from 'react'
import { Theme } from '../../interfaces'

interface BtnProps {
  children: ReactNode
  variant: string
  theme: string
}

interface BtnVariants {
  primary: {
    theme: Theme
    getStyles: (theme: keyof Theme) => string
  }
  secondary: {
    theme: Theme
    getStyles: (theme: keyof Theme) => string
  }
}

const variants: BtnVariants = {
  primary: {
    theme: {
      'sanctum-light': `bg-sanctum-blue/33 hover:bg-sanctum-blue`,
      'sanctum-dark': 'bg-sanctum-blue-dark/33 hover:bg-sanctum-blue'
    },
    getStyles: function (theme: keyof Theme) {
      return `transition font-medium text-base text-white rounded-full py-2 px-4 ${this.theme[theme]}`
    }
  },
  secondary: {
    theme: {
      'sanctum-light':
        'bg-sanctum-blue-light/33 border-2 border-sanctum-blue-light text-sanctum-blue-medium hover:bg-white',
      'sanctum-dark':
        'text-white border-2 border-sanctum-blue-medium/50 bg-white/10 hover:bg-sanctum-blue-medium'
    },
    getStyles: function (theme: keyof Theme) {
      return `transition font-medium text-lg text-sm rounded-full py-1 px-2 ${this.theme[theme]}`
    }
  }
}

const Button: React.FC<BtnProps> = ({
  variant = 'primary',
  children = 'Click me',
  theme = 'sanctum-light',
  ...rest
}) => (
  <button
    className={`${variants[variant as keyof BtnVariants].getStyles(
      theme as keyof Theme
    )}`}
    {...rest}
  >
    {children}
  </button>
)

export default Button
