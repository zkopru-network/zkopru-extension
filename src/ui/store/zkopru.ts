import create from 'zustand'

// TODO: import
type ZkAddress = any

export type Store = {
  balance: number
  zkAddress: ZkAddress
  account: string // L1 account string
  connectedSites: string[]
  setBalance: (balance: number) => void
  setZkAddress: (zkAddress: ZkAddress) => void
  setAccount: (account: string) => void
  setConnectedSites: (connectedSites: string[]) => void
}

export const useZkopruStore = create<Store>((set) => ({
  balance: 0,
  zkAddress: '',
  account: '',
  connectedSites: [],
  setBalance: (balance: number) => set({ balance }),
  setZkAddress: (zkAddress: ZkAddress) => set({ zkAddress }),
  setAccount: (account: string) => set({ account }),
  setConnectedSites: (connectedSites: string[]) => set({ connectedSites })
}))
