import ExtensionFrame from '../../components/ExtensionFrame'
import { Overview } from '../../components/Overview'
import DashboardTabs from './DashboardTabs'

export const Dashboard = () => (
  <ExtensionFrame>
    <Overview />
    <DashboardTabs />
  </ExtensionFrame>
)
