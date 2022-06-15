import React from 'react'
import { css } from '@linaria/core'
import clsx from 'clsx'
import { globalStyle, container } from '../globalStyle'
import { LightTheme } from '../theme'

const LoadingPage = () => {
  return (
    <div className={clsx(LightTheme, globalStyle, container, content)}>
      Now Loading ...
    </div>
  )
}

const content = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default LoadingPage
