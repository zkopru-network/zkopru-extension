import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import { useNavigate } from 'react-router-dom'
import { useZkopruStore } from '../../store/zkopru'
import Button from '../../components/Button'
import routes from '../../../routes'

type TokenData = {
  symbol: string
  icon: string
  value: string
  usdValue: string
}

const Wallet = () => {
  const [tokenData, setTokenData] = useState<{
    data: TokenData[]
    totalUSDValue: number
  }>({ data: [], totalUSDValue: 0 })
  const navigate = useNavigate()

  const { balance } = useZkopruStore(
    (state) => ({
      balance: state.balance
    }),
    shallow
  )

  useEffect(() => {
    if (balance) {
      const data = [
        {
          symbol: 'ETH',
          value: balance.eth.toString(),
          usdValue: '0', // TODO: get use value from oracle
          icon: '💸'
        },
        ...Object.keys(balance.tokenBalances).map((key) => ({
          symbol: key,
          value: balance.tokenBalances[key].toString(),
          usdValue: '0',
          icon: '💸'
        }))
      ]
      const totalUSDValue = data.reduce((acc, curr) => {
        return acc + parseFloat(curr.usdValue)
      }, 0)

      setTokenData({
        data,
        totalUSDValue
      })
    }
  }, [balance])

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
            key={token.symbol}
            onClick={() => navigate(routes.TRANSFER)}
          >
            <div className="flex justify-between items-center text-sm text-skin-text-primary">
              <div className="left font-medium flex justify-between items-center gap-2">
                {token.icon}
                <p>{token.symbol}</p>
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

export default Wallet
