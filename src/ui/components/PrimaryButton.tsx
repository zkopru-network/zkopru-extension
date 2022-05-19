import React, { MouseEventHandler, ReactNode } from 'react'
import { css } from '@linaria/core'

const style = css`
  display: flex;
  justify-content: center;
  background-color: turquoise;
  border-radius: 4px;
  padding: 4px 8px;
`

type Props = {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const PrimaryButton = ({ onClick, children }: Props) => (
  <button className={style} onClick={onClick}>
    {children}
  </button>
)

export default PrimaryButton
