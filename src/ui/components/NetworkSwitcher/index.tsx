import { Menu, Transition } from '@headlessui/react'
import { NetworkProps, NetworkSwitcherProps } from '../../interfaces'
import { ArrowDownSFill } from '../common/icons'

// TODO: Replace with actual networks @tkmct
const Networks: NetworkProps[] = [
  {
    label: 'Optimism',
    chainId: 1
  },
  {
    label: 'Goerli',
    chainId: 5
  }
]

const linkStyles =
  'flex items-center justify-between px-4 py-2 text-skin-text-primary hover:bg-btn-bright hover:text-white rounded-md'

const NetworkSwitcher = ({
  networks = Networks,
  onNetworkChange
}: NetworkSwitcherProps) => (
  <Menu as="div" className="relative text-xs text-skin-text-primary">
    <Menu.Button
      type="button"
      className="bg-skin-light-gray border border-skin-text-primary/40 inline-flex items-center font-medium gap-2 rounded-full px-2 py-1 transition hover:opacity-80 focus:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-btn-bright focus:ring-offset-2 focus:ring-offset-skin-back"
    >
      {/* TODO: Color code icon to state */}
      <span className="bg-green-400 rounded-full h-[6px] w-[6px]"></span>
      Choose network
      <ArrowDownSFill className="text-skin-text-primary/70" />
    </Menu.Button>
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items className="absolute origin-top-right p-1 top-0 right-0 w-36 mt-2 mr-2 bg-skin-light-gray flex flex-col shadow-lg shadow-skin-text-primary/10 rounded-md text-skin-text-primary/80 font-medium overflow-hidden">
        {networks.map(({ label, chainId }, index) => (
          <Menu.Item as="button" key={index}>
            {({ active }) => (
              <a
                className={
                  active
                    ? `${linkStyles} bg-btn-bright text-white`
                    : `${linkStyles}`
                }
                onClick={() => onNetworkChange && onNetworkChange(chainId)}
              >
                {label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default NetworkSwitcher
