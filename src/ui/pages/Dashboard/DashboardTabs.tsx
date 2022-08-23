import React from 'react'
import { Tab } from '@headlessui/react'
import AccountActivity from './AccountActivity'
import Wallet from './Wallet'

const DashboardTabs = () => {
  const tabs = [
    {
      name: 'Wallet',
      content: <Wallet />
    },
    {
      name: 'Activity',
      content: <AccountActivity />
    }
  ]

  return (
    <Tab.Group>
      <Tab.List className="grid grid-cols-2 text-tab-selected/80 font-medium text-sm">
        {tabs.map(({ name }, index) => (
          <Tab
            defaultChecked={index === 0}
            key={index}
            className={({ selected }) =>
              selected
                ? `font-semibold text-tab-selected pb-3 border-b-2 border-tab-selected transition duration-200 ease-out  outline-none opacity:50`
                : `border-b-2 border-b-skin-light-gray pb-3 transition duration-200 ease-out hover:opacity-60 outline-none`
            }
          >
            {name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="text-skin-text-primary text-sm">
        {tabs.map(({ content }, index) => (
          <Tab.Panel className="flex flex-col gap-2" key={index}>
            {content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default DashboardTabs
