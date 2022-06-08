import React from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../components/PrimaryButton'
import { Input } from '../components/Form'
import { useAuthStore } from '../store/auth'
import { ROUTES } from '../../share/constants'

const container = css`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  width: 320px;
  height: 480px;
  overflow-y: scroll;
`

const UnlockPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const handleSubmit = async () => {
    // TODO: check password
    setAuthenticated(true)
    navigate(ROUTES.HOME)
  }

  return (
    <div className={container}>
      <h2>{t('unlock')}</h2>
      <Input type="password" placeholder={t('password')} />
      <PrimaryButton onClick={handleSubmit}>{t('unlock')}</PrimaryButton>
    </div>
  )
}

export default UnlockPage
