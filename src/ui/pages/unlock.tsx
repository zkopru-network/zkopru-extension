import React, { useState } from 'react'
import browser from 'webextension-polyfill'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import shallow from 'zustand/shallow'
import { useAuthStore } from '../store/auth'
import useBackgroundConnection from '../hooks/useBackgroundConnection'
import RoundedButton from '../components/RoundedButton'
import {
  Input,
  FieldControl,
  Label,
  ErrorMessage as E
} from '../components/Form'
import ROUTES from '../../routes'

type FormData = {
  password: string
}

const UnlockPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    setAuthenticated,
    redirectPath,
    redirectParams,
    setRedirectPath,
    setRediretParams
  } = useAuthStore(
    (state) => ({
      setAuthenticated: state.setAuthenticated,
      redirectPath: state.redirectPath,
      redirectParams: state.redirectParams,
      setRedirectPath: state.setRedirectPath,
      setRediretParams: state.setRedirectParams
    }),
    shallow
  )
  const background = useBackgroundConnection()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const [error, setError] = useState<string | null>(null)

  const unlock = handleSubmit(async ({ password }) => {
    const result = (await background.verifyPassword(password)).payload.result
    if (!result) {
      setError('Incorrect password')
      return
    }

    const now = new Date().getTime()
    await browser.storage.local.set({ unlocktime: now })

    setAuthenticated(true)

    // clear redirect path and params
    setRedirectPath(null)
    setRediretParams(null)

    navigate({
      pathname: redirectPath || ROUTES.HOME,
      search: redirectParams || ''
    })
  })

  return (
    <div>
      <h2 className={pageTitle}>{t('unlock')}</h2>
      <div className={body}>
        <form onSubmit={unlock}>
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
            {error && <E>{error}</E>}
          </FieldControl>

          <FieldControl>
            <RoundedButton type="submit">{t('unlock')}</RoundedButton>
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

export default UnlockPage
