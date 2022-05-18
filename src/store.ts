import create from 'zustand/vanilla'
// @ts-ignore
import Zkopru from '@zkopru/client/browser'

type Store = {
  walletKey: null | string
  client: Zkopru.Node | null // TODO: add typings to Zkopru.Node
  wallet: Zkopru.Wallet | null // TODO: add typings to Zkopru.Wallet
  address: string | null
  initialized: boolean
  setWalletKey: (walletKey: string) => void
  setClient: (client: Zkopru.Node) => void
  setWallet: (client: Zkopru.Wallet) => void
  setAddress: (address: string) => void
  setInitialized: (initialized: boolean) => void
}

export const store = create<Store>((set) => ({
  walletKey: null,
  client: null,
  wallet: null,
  address: null,
  initialized: false,

  setWalletKey: (walletKey: string) => set({ walletKey }),
  setClient: (client: Zkopru.Node) => set({ client }),
  setWallet: (client: Zkopru.Wallet) => set({ client }),
  setAddress: (address: string) => set({ address }),
  setInitialized: (initialized: boolean) => set({ initialized })
}))
