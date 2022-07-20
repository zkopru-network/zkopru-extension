import React, { ReactNode } from 'react'
import { css } from '@linaria/core'

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 48px;
  border: none;
  height: 44px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 4px 4px 12px #2421d641;
  text-transform: uppercase;
  cursor: pointer;
  min-width: 120px;
`

type Props = {
  children: ReactNode
}

const PrimaryButton = ({
  children,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => (
  <button className={style} {...props}>
    {children}
  </button>
)

export default PrimaryButton
