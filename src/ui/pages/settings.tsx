import React from 'react'
import { css } from '@linaria/core'
import { useZkopruStore } from '../store/zkopru'

const SettingsPage = () => {
  const { connectedSites } = useZkopruStore()
  return (
    <div className={container}>
      <h1>Settings</h1>
      <div>
        <h2>Connected sites</h2>
        {connectedSites.map((site) => {
          return <div key={site}>{site}</div>
        })}
      </div>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  overflow-y: scroll;
`

export default SettingsPage
