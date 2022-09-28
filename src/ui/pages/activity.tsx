import React from 'react'
import { css } from '@linaria/core'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ActivityCell from '../components/ActivityCell'
import ROUTES from '../../routes'
import { useQuery } from 'react-query'
import useBackgroundConnection from '../hooks/useBackgroundConnection'

const ActivityPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const background = useBackgroundConnection()
  const activityQuery = useQuery('activity', async () => {
    // TODO: fetch periodically
    return (await background.loadActivity()).payload.activities
  })

  return (
    <div className={container}>
      <div className={header}>
        <h1 className={pageTitle}>{t('activity')}</h1>
        <a className={closeLink} onClick={() => navigate(ROUTES.HOME)}>
          x
        </a>
      </div>
      <div>
        {activityQuery.data?.map((item) => (
          <ActivityCell item={item} key={item.hash} />
        ))}
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

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const pageTitle = css`
  text-transform: capitalize;
`

const closeLink = css`
  cursor: pointer;
  font-size: 20px;
`

export default ActivityPage
