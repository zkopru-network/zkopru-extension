import create from 'zustand'
import { BACKGROUND_STATUS } from '../../share/constants'

type Store = {
  backgroundStatus: BACKGROUND_STATUS
  setBackgroundStatus: (status: BACKGROUND_STATUS) => void
}

export const useStore = create<Store>((set) => ({
  backgroundStatus: BACKGROUND_STATUS.STARTINGUP,
  setBackgroundStatus: (status: BACKGROUND_STATUS) =>
    set({ backgroundStatus: status })
}))
