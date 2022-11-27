import React from 'react'
import ConfirmConnection from './index'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'

const ConfirmConnectionPage = () => {
  const background = useBackgroundConnection()
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string)
  }) as any
  const origin = params.origin
  const tabId = Number(params.tabId)
  console.log(origin, tabId)

  const handleConnect = async () => {
    const res = await background.connect(origin)
    if (res.payload.result) {
      window.close()
    } else {
      // display error message
    }
  }
  return (
    <ConfirmConnection
      origin={origin}
      handleConnect={handleConnect}
      handleClose={window.close}
    />
  )
}

export default ConfirmConnectionPage
