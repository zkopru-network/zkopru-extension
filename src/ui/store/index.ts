import create from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  clientInitialized: boolean
  balance: number
  address: string
  setBalance: (balance: number) => void
  setAddress: (address: string) => void
}

export const useStore = create<Store, [['zustand/persist', Store]]>(
  persist(
    (set) => ({
      clientInitialized: false,
      balance: 0,
      address: '',
      setBalance: (balance: number) => set({ balance }),
      setAddress: (address: string) => set({ address })
    }),
    { name: 'popup-store', getStorage: () => localStorage }
  )
)
