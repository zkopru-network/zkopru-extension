import Header from '../../components/common/Header'
import ExtensionFrame from '../../components/ExtensionFrame'
import { Overview } from '../../components/Overview'

export const Dashboard = () => (
  <ExtensionFrame>
    <Header />
    <Overview />
    <h3>Lower</h3>
  </ExtensionFrame>
)
