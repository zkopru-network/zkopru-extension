import create from 'zustand'
import { fromWei } from '../../share/utils'
import type { TokenBalances } from '../../share/types'

// TODO: import
type ZkAddress = any
type Balance = {
  eth: number
  tokenBalances: TokenBalances
  lockedTokenBalances: TokenBalances
}
type RawBalance = Omit<Balance, 'eth'> & { eth: string }

export type Store = {
  balance: Balance | undefined
  zkAddress: ZkAddress
  account: string // L1 account string
  connectedSites: string[]
  setBalance: (balance: RawBalance) => void
  setZkAddress: (zkAddress: ZkAddress) => void
  setAccount: (account: string) => void
  setConnectedSites: (connectedSites: string[]) => void
}

export const useZkopruStore = create<Store>((set) => ({
  balance: undefined,
  zkAddress: '',
  account: '',
  connectedSites: [],
  setBalance: (balance: RawBalance) =>
    set({ balance: { ...balance, eth: fromWei(balance.eth) } }),
  setZkAddress: (zkAddress: ZkAddress) => set({ zkAddress }),
  setAccount: (account: string) => set({ account }),
  setConnectedSites: (connectedSites: string[]) => set({ connectedSites })
}))
