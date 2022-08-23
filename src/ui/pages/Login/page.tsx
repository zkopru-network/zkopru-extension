import React from 'react'
import browser from 'webextension-polyfill'
import { useNavigate } from 'react-router-dom'
import shallow from 'zustand/shallow'
import { useAuthStore } from '../../store/auth'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'
import { Login, FormData } from './index'
import ROUTES from '../../../routes'

// container component
const LoginPage = () => {
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

  const navigate = useNavigate()
  const onSubmit = async ({ password }: FormData) => {
    const result = (await background.verifyPassword(password)).payload.result
    if (!result) {
      throw new Error('Incorrect password')
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
  }

  return <Login onSubmit={onSubmit} />
}

export default LoginPage
