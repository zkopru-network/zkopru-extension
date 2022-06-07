import React from 'react'
import { css } from '@linaria/core'
import PrimaryButton from '../components/PrimaryButton'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const UnlockPage = () => {
  const handleClick = async () => {
    console.log('unlock clicked')
    // check password
    // move to dashboard
  }

  return (
    <div className={container}>
      <h1>Unlock</h1>
      <PrimaryButton onClick={handleClick}>Unlock</PrimaryButton>
    </div>
  )
}

export default UnlockPage
