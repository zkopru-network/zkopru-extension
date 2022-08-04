import NetworkSwitcher from '../NetworkSwitcher'
import Settings from '../Settings'
import { ZkopruLogo } from './icons'

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <ZkopruLogo />
      <div className="flex gap-6 items-center justify-center">
        <NetworkSwitcher />
        <Settings />
      </div>
    </div>
  )
}
