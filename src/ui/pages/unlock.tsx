import React, { useState } from 'react'
import browser from 'webextension-polyfill'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/auth'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import PrimaryButton from '../components/PrimaryButton'
import { Input } from '../components/Form'
import { ROUTES } from '../../share/constants'

const UnlockPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const background = useBackgroundConnection()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    const result = (await background.verifyPassword(password)).payload.result
    if (!result) {
      setError('Incorrect password')
      return
    }

    const now = new Date().getTime()
    await browser.storage.local.set({ unlocktime: now })

    setAuthenticated(true)
    navigate(ROUTES.HOME)
  }

  return (
    <div>
      <h2>{t('unlock')}</h2>
      {error && <div>{error}</div>}
      <div className={body}>
        <Input
          type="password"
          placeholder={t('password')}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton onClick={handleSubmit}>{t('unlock')}</PrimaryButton>
      </div>
    </div>
  )
}

const body = css`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
`

export default UnlockPage
