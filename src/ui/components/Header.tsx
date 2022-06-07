import React from 'react'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { useStore } from '../store'
import { shortenAddress } from '../../utils'

const Header = () => {
  const { address } = useStore()

  return (
    <header className={container}>
      <div className={selectNetwork}>
        <NetworkStatus />
        Goerli
      </div>
      <div className={addressSection}>{shortenAddress(address)}</div>
      <div> </div>
    </header>
  )
}

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-bottom: solid 1px #afafaf;
  height: 40px;
`

const selectNetwork = css`
  width: 80px;
  padding: 2px 4px;
  padding-left: 16px;
  border-radius: 12px;
  border: solid 1px #afafaf;
  position: relative;
`

const NetworkStatus = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: blue;
  position: absolute;
  top: 5px;
  left: 4px;
`

const addressSection = css``

export default Header
