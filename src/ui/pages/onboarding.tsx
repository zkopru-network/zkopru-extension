import React, { useState } from 'react'
import browser from 'webextension-polyfill'
import shallow from 'zustand/shallow'
import { css } from '@linaria/core'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/auth'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import PrimaryButton from '../components/PrimaryButton'
import { Input } from '../components/Form'
import { ONBOARDING_URL } from '../../share/constants'

const OnboardingPage = () => {
  const { t } = useTranslation()
  const { completeOnboarding, setAuthenticated } = useAuthStore(
    (state) => ({
      completeOnboarding: state.completeOnboarding,
      setAuthenticated: state.setAuthenticated
    }),
    shallow
  )
  const background = useBackgroundConnection()
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    // TODO: add loading state
    await background.registerPassword(password)

    completeOnboarding()
    setAuthenticated(true)

    // close popup and open connect and sign page in new tab
    // TODO:  localhost is not valid query string. comment in next line after deploy onboarding page
    // const tabs = await browser.tabs.query({ url: ONBOARDING_URL })
    const tabs: browser.Tabs.Tab[] = []
    if (tabs.length === 0) {
      open(ONBOARDING_URL)
    } else {
      browser.tabs.update(tabs[0].id, { active: true })
    }
    window.close()
  }

  return (
    <div>
      <h2>{t('onboarding')}</h2>
      <div className={body}>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton onClick={handleSubmit}>{t('register')}</PrimaryButton>
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

export default OnboardingPage
