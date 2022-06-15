import create from 'zustand/vanilla'
// @ts-ignore
import Zkopru from '@zkopru/client/browser'
import { BACKGROUND_STATUS } from '../share/constants'

type Store = {
  status: BACKGROUND_STATUS
  walletKey: null | string
  client: Zkopru.Node | null // TODO: add typings to Zkopru.Node
  wallet: Zkopru.Wallet | null // TODO: add typings to Zkopru.Wallet
  address: string | null
  setStatus: (status: BACKGROUND_STATUS) => void
  setWalletKey: (walletKey: string) => void
  setClient: (client: Zkopru.Node) => void
  setWallet: (client: Zkopru.Wallet) => void
  setAddress: (address: string) => void
}

export const store = create<Store>((set) => ({
  status: BACKGROUND_STATUS.STARTINGUP,
  walletKey: null,
  client: null,
  wallet: null,
  address: null,

  setStatus: (status: BACKGROUND_STATUS) => set({ status }),
  setWalletKey: (walletKey: string) => set({ walletKey }),
  setClient: (client: Zkopru.Node) => set({ client }),
  setWallet: (wallet: Zkopru.Wallet) => set({ wallet }),
  setAddress: (address: string) => set({ address })
}))
