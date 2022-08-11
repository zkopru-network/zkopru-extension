import { Tab } from '@headlessui/react'
import Button from '../../components/Button'
import ExtensionFrame from '../../components/ExtensionFrame'
import { Overview } from '../../components/Overview'

export const Dashboard = () => (
  <ExtensionFrame>
    <Overview />
    <Tab.Group>
      <Tab.List className="grid grid-cols-2 text-tab-selected/80 font-medium text-sm">
        <Tab
          defaultChecked
          className={({ selected }) =>
            selected
              ? `font-semibold text-tab-selected pb-3 border-b-2 border-tab-selected transition duration-200 ease-out  outline-none opacity:50`
              : `border-b-2 border-b-skin-light-gray pb-3 transition duration-200 ease-out hover:opacity-60 outline-none`
          }
        >
          Wallet
        </Tab>
        {/* <Tab
          className={({ selected }) =>
            selected
              ? `font-semibold text-tab-selected pb-3 border-b-2 border-tab-selected transition duration-200 ease-out opacity:50`
              : `border-b-2 border-b-skin-light-gray pb-3 transition duration-200 ease-out hover:opacity-60`
          }
        >
          NFTs
        </Tab> */}
        <Tab
          className={({ selected }) =>
            selected
              ? `font-semibold text-tab-selected pb-3 border-b-2 border-tab-selected transition duration-200 ease-out opacity:50`
              : `border-b-2 border-b-skin-light-gray pb-3 transition duration-200 ease-out hover:opacity-60`
          }
        >
          Activity
        </Tab>
      </Tab.List>
      <Tab.Panels className="text-skin-text-primary text-sm">
        <Tab.Panel className="flex flex-col gap-2">
          <section className="flex justify-between items-center font-semibold border-b border-b-skin-light-gray pb-2">
            <p className="text-sm">Total</p>
            <p className="text-lg">USD 98,200.00</p>
          </section>
          <ul className="h-44 overflow-y-auto mb-2">
            <li
              tabIndex={0}
              className="w-full hover:bg-skin-light-gray hover:cursor-pointer p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/40"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex justify-between items-center gap-2">
                  <p>🤫</p>
                  <p>ETH</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
            <li
              tabIndex={0}
              className="w-full hover:bg-skin-light-gray hover:cursor-pointer p-2 rounded-lg"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex justify-between items-center gap-2">
                  <p>💀</p>
                  <p>USDC</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
            <li
              tabIndex={0}
              className="w-full hover:bg-skin-light-gray hover:cursor-pointer p-2 rounded-md"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex justify-between items-center gap-2">
                  <p>🏎️</p>
                  <p>XRP</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
            <li
              tabIndex={0}
              className="w-full hover:bg-skin-light-gray hover:cursor-pointer p-2 rounded-lg"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex justify-between items-center gap-2">
                  <p>👻</p>
                  <p>DAI</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
            <li
              tabIndex={0}
              className="w-full hover:bg-skin-light-gray hover:cursor-pointer p-2 rounded-lg"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex justify-between items-center gap-2">
                  <p>✨</p>
                  <p>BSC</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
          </ul>
          <Button variant="filled">Manage tokens</Button>
        </Tab.Panel>
        {/* NFT TAB  */}
        {/* <Tab.Panel className="flex flex-col gap-2">
          <section className="flex justify-between items-center font-semibold border-b border-b-skin-light-gray pb-2">
            <p className="text-sm">Total</p>
            <p className="text-lg">USD 9,500.00</p>
          </section>
          <ul className="h-44 overflow-y-auto mb-2">
            <li
              tabIndex={0}
              className="w-full h-20 bg-skin-light-gray hover:cursor-pointer p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/40"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex justify-between items-center gap-2">
                  <p>🤫</p>
                  <p>Ghosts</p>
                  <p>✅</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
          </ul>
        </Tab.Panel> */}
        <Tab.Panel>
          <ul className="h-44 overflow-y-auto mb-2">
            <li className="text-center bg-skin-light-gray w-full py-1 mb-1">
              <p className="text-sm">August 2, 2022</p>
            </li>
            <li
              tabIndex={0}
              className="w-full p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/40"
            >
              <div className="flex justify-between items-center text-sm text-skin-text-primary">
                <div className="left font-medium flex flex-col justify-between items-center gap-2">
                  <p>🤫</p>
                  <p>ETH</p>
                </div>
                <div className="right flex gap-2">
                  <div className="flex flex-col items-end font-medium">
                    <p>12.98</p>
                    <p className="text-opacity-80 text-xs">USD 18293.02</p>
                  </div>
                  <p className="opacity-60">➥</p>
                </div>
              </div>
            </li>
          </ul>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </ExtensionFrame>
)
