import NetworkSwitcher from '../NetworkSwitcher'
import Settings from '../Settings'
import { ZkopruLogo } from './icons'

export default function Header() {
  return (
    <div className="flex justify-between items-center relative z-10">
      <NetworkSwitcher />
      <div className="absolute top-0 left-0 ml-48 mt-1">
        <ZkopruLogo />
      </div>
      <Settings />
    </div>
  )
}
