import { useState } from 'react'
import Button from '../../components/Button'

// @tkmct - I'm assuming we can convert to USD to start with
const mockData = [
  {
    name: 'ETH',
    icon: '🤫',
    value: '12.98',
    usdValue: '18293.02'
  },
  {
    name: 'USDC',
    icon: '💀',
    value: '12.98',
    usdValue: '18293.02'
  },
  {
    name: 'XRP',
    icon: '🏎️',
    value: '12.98',
    usdValue: '18293.02'
  },
  {
    name: 'DAI',
    icon: '👻',
    value: '12.98',
    usdValue: '18293.02'
  },
  {
    name: 'BSC',
    icon: '✨',
    value: '12.98',
    usdValue: '18293.02'
  }
]

// sort by name A-Z
mockData.sort((a, b) => (a.name > b.name ? 1 : -1))

const totalUSDValue = mockData.reduce((acc, curr) => {
  return acc + parseFloat(curr.usdValue)
}, 0)

export default function Wallet() {
  const [tokenData] = useState({ data: mockData, totalUSDValue })

  return (
    <>
      <section className="flex justify-between items-center font-semibold border-b border-b-skin-light-gray pb-2">
        <p className="text-sm">Total</p>
        <p className="text-lg">USD {tokenData.totalUSDValue.toFixed(2)}</p>
      </section>
      <ul className="h-44 overflow-y-auto mb-2">
        {tokenData.data.map((token) => (
          <li
            tabIndex={0}
            className="w-full hover:bg-skin-light-gray/80 hover:cursor-pointer p-2 rounded-lg transition duration-200 ease-out focus:outline-none border-2 border-transparent focus:border-skin-inverse/40"
            key={token.name}
          >
            <div className="flex justify-between items-center text-sm text-skin-text-primary">
              <div className="left font-medium flex justify-between items-center gap-2">
                {token.icon}
                <p>{token.name}</p>
              </div>
              <div className="right flex gap-2">
                <div className="flex flex-col items-end font-medium">
                  <p>{token.value}</p>
                  <p className="text-opacity-80 text-xs">
                    USD {token.usdValue}
                  </p>
                </div>
                {/* TODO: add proper icon and connect it to token page */}
                <p className="opacity-60">➥</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="filled">Manage tokens</Button>
    </>
  )
}
