import create from 'zustand'

// TODO: import
type ZkAddress = any

export type Store = {
  balance: number
  zkAddress: ZkAddress
  account: string // L1 account string
  setBalance: (balance: number) => void
  setZkAddress: (zkAddress: ZkAddress) => void
  setAccount: (account: string) => void
}

export const useZkopruStore = create<Store>((set) => ({
  balance: 0,
  zkAddress: '',
  account: '',
  setBalance: (balance: number) => set({ balance }),
  setZkAddress: (zkAddress: ZkAddress) => set({ zkAddress }),
  setAccount: (account: string) => set({ account })
}))
