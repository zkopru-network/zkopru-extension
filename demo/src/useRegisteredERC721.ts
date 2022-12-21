import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import rpcClient from './rpcClient'

export const abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)'
]

export type ERC721 = {
  name: number
  symbol: string
  address: string
}

export function useRegisteredERC721s() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:5000')

  return useQuery<ERC721[]>(['erc721tokens'], async () => {
    const res = await rpcClient.getRegisteredTokens()
    if (!res.data) throw new Error('No data returned')
    const tokens = res.data.result

    return await Promise.all(
      tokens.erc721s.map(async (address: string) => {
        const contract = new ethers.Contract(address, abi, provider)
        const [symbol, name] = [await contract.symbol(), await contract.name()]
        return { symbol, name, address }
      })
    )
  })
}
