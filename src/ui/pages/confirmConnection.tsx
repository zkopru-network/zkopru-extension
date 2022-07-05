import React from 'react'
import { css } from '@linaria/core'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/PrimaryButton'
import useBackgroundConnection from '../hooks/useBackgroundConnection'

const ConfirmConnectionPage = () => {
  const { t } = useTranslation()
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
    <div className={container}>
      <h1 className={pageTitle}>{t('connect')}</h1>
      <p>Do you want to connect to this page?</p>
      <p>{origin}</p>
      <div className={buttonSection}>
        <PrimaryButton onClick={window.close}>Cancel</PrimaryButton>
        <PrimaryButton onClick={handleConnect}>Connect</PrimaryButton>
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

const pageTitle = css`
  text-transform: capitalize;
`

const buttonSection = css`
  display: flex;
  justify-content: space-between;
`

export default ConfirmConnectionPage
