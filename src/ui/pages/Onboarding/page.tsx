import React from 'react'
import browser from 'webextension-polyfill'
import shallow from 'zustand/shallow'
import { useAuthStore } from '../../store/auth'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'
import { ONBOARDING_URL } from '../../../share/constants'
import { Onboarding, FormData } from './index'

const OnboardingPage = () => {
  const { completeOnboarding, setAuthenticated } = useAuthStore(
    (state) => ({
      completeOnboarding: state.completeOnboarding,
      setAuthenticated: state.setAuthenticated
    }),
    shallow
  )
  const background = useBackgroundConnection()
  const handleSubmit = async ({ password, confirmPassword }: FormData) => {
    if (password !== confirmPassword) {
      throw new Error('Password confirmation does not match')
    }
    // TODO: add loading state
    await background.registerPassword(password)

    const now = new Date().getTime()
    await browser.storage.local.set({ unlocktime: now })
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

  return <Onboarding onSubmit={handleSubmit} />
}

export default OnboardingPage
