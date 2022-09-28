import React from 'react'
import { useQuery } from 'react-query'
import useBackgroundConnection from '../../hooks/useBackgroundConnection'
import { Dashboard } from './index'

const DashboardPage = () => {
  const background = useBackgroundConnection()
  const activityQuery = useQuery('activity', async () => {
    // TODO: fetch periodically
    return (await background.loadActivity()).payload.activities
  })

  return <Dashboard activities={activityQuery.data} />
}

export default DashboardPage
