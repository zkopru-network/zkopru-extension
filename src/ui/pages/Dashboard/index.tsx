import React from 'react'
import ExtensionFrame from '../../components/ExtensionFrame'
import { Overview } from '../../components/Overview'
import DashboardTabs from './DashboardTabs'
import type { Activity } from '../../../share/types'

type DashboardProps = {
  activities: Activity[] | undefined
}

export const Dashboard = ({ activities }: DashboardProps) => (
  <ExtensionFrame>
    <Overview />
    <DashboardTabs activities={activities} />
  </ExtensionFrame>
)
