import React, { useCallback } from 'react'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { shortenAddress } from '../../share/utils'
import { useZkopruStore } from '../store/zkopru'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes'

const Header = () => {
  const address = useZkopruStore((state) => state.zkAddress)
  const copyAddress = useCallback(() => {
    if (!address) return
    navigator.clipboard.writeText(address)
  }, [address])

  return (
    <header className={container}>
      <div className={selectNetwork}>
        <NetworkStatus />
        <span className={networkName}>Local</span>
      </div>
      <div className={addressSection} onClick={copyAddress}>
        {shortenAddress(address)}
      </div>
      <Link to={ROUTES.SETTINGS}>setting</Link>
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
  background-color: var(--color-surface2);
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px 4px;
  border-radius: 24px;
`

const networkName = css`
  display: inline-block;
  width: 60%;
`

const NetworkStatus = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #1ce076;
`

const addressSection = css`
  border-radius: 12px;
  padding: 4px 6px;
  cursor: pointer;
  :hover {
    background-color: var(--color-surface2);
  }
`

export default Header
