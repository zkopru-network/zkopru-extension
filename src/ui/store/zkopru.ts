import create from 'zustand'

// TODO: import
type ZkAddress = any

export type Store = {
  balance: number | null
  zkAddress: ZkAddress | null
  setBalance: (balance: number) => void
  setZkAddress: (zkAddress: ZkAddress) => void
}

export const useZkopruStore = create<Store>((set) => ({
  balance: 0,
  zkAddress: '',
  setBalance: (balance: number) => set({ balance }),
  setZkAddress: (zkAddress: ZkAddress) => set({ zkAddress })
}))
