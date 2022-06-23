import React from 'react'
import browser from 'webextension-polyfill'
import shallow from 'zustand/shallow'
import { css } from '@linaria/core'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useAuthStore } from '../store/auth'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import PrimaryButton from '../components/PrimaryButton'
import {
  Input,
  Label,
  ErrorMessage as E,
  FieldControl
} from '../components/Form'
import { ONBOARDING_URL } from '../../share/constants'

type FormData = {
  password: string
  passwordConfirm: string
}

const OnboardingPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const { t } = useTranslation()
  const { completeOnboarding, setAuthenticated } = useAuthStore(
    (state) => ({
      completeOnboarding: state.completeOnboarding,
      setAuthenticated: state.setAuthenticated
    }),
    shallow
  )
  const background = useBackgroundConnection()

  const submit = handleSubmit(async ({ password }) => {
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
  })

  return (
    <div>
      <h2 className={pageTitle}>{t('onboarding')}</h2>
      <div className={body}>
        <form onSubmit={submit}>
          <FieldControl>
            <Label>Password</Label>
            <Input
              {...register('password', {
                required: t('error_message.required')
              })}
              type="password"
              placeholder="password"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <E>{message}</E>}
            />
          </FieldControl>
          <FieldControl>
            <Label>Confirm</Label>
            <Input
              {...register('passwordConfirm', {
                required: t('error_message.required'),
                validate: (v) =>
                  v === getValues('password') ||
                  t('error_message.password_not_match')
              })}
              type="password"
              placeholder="confirm password"
            />
            <ErrorMessage
              errors={errors}
              name="passwordConfirm"
              render={({ message }) => <E>{message}</E>}
            />
          </FieldControl>
          <FieldControl>
            <PrimaryButton type="submit">{t('register')}</PrimaryButton>
          </FieldControl>
        </form>
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

const pageTitle = css`
  text-transform: capitalize;
`

export default OnboardingPage
