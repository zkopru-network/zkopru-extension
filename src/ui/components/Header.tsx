import React from 'react'
import browser from 'webextension-polyfill'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { useAuthStore } from '../store/auth'
import { shortenAddress } from '../../share/utils'
import { useZkopruStore } from '../store/zkopru'

const Header = () => {
  const address = useZkopruStore((state) => state.zkAddress)
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const lock = async () => {
    await browser.storage.local.set({ unlocktime: 0 })

    setAuthenticated(false)
  }

  return (
    <header className={container}>
      <div className={selectNetwork}>
        <NetworkStatus />
        <span className={networkName}>Goerli</span>
      </div>
      <div className={addressSection}>{shortenAddress(address)}</div>
      <div>
        <button onClick={lock}>Lock wallet</button>
      </div>
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

const addressSection = css``

export default Header
