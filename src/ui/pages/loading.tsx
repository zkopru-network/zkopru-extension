import React from 'react'
import clsx from 'clsx'
import { globalStyle, container } from '../globalStyle'

const LoadingPage = () => {
  return <div className={clsx(globalStyle, container)}>Now Loading ...</div>
}

export default LoadingPage
