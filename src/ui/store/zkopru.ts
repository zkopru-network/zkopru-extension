import create from 'zustand'
import type { L2Balance } from '../../share/types'

// TODO: import
type ZkAddress = any

export type Store = {
  balance: L2Balance | undefined
  zkAddress: ZkAddress
  account: string // L1 account string
  connectedSites: string[]
  setBalance: (balance: L2Balance) => void
  setZkAddress: (zkAddress: ZkAddress) => void
  setAccount: (account: string) => void
  setConnectedSites: (connectedSites: string[]) => void
}

export const useZkopruStore = create<Store>((set) => ({
  balance: undefined,
  zkAddress: '',
  account: '',
  connectedSites: [],
  setBalance: (balance: L2Balance) => set({ balance }),
  setZkAddress: (zkAddress: ZkAddress) => set({ zkAddress }),
  setAccount: (account: string) => set({ account }),
  setConnectedSites: (connectedSites: string[]) => set({ connectedSites })
}))
