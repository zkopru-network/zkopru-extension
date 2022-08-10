import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import rpcClient from './rpcClient'

export const abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)'
]

export type Token = {
  decimals: number
  symbol: string
  address: string
}

export const ETH: Token = {
  decimals: 18,
  symbol: 'ETH',
  address: '0x00000000000000000000'
}

export function useRegisteredERC20s() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:5000')

  return useQuery<Token[]>(['tokens'], async () => {
    const res = await rpcClient.getRegisteredTokens()
    if (!res.data) throw new Error('No data returned')
    const tokens = res.data.result

    return await Promise.all(
      tokens.erc20s.map(async (address: string) => {
        const contract = new ethers.Contract(address, abi, provider)
        const [symbol, decimals] = [
          await contract.symbol(),
          await contract.decimals()
        ]
        return { symbol, decimals, address }
      })
    )
  })
}
