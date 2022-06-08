import create from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  onboardingCompleted: boolean
  authenticated: boolean
  authenticate: () => void
  completeOnboarding: () => void
}

export const useAuthStore = create<Store, [['zustand/persist', Store]]>(
  persist(
    (set) => ({
      onboardingCompleted: false,
      authenticated: false,
      authenticate: () => set({ authenticated: true }),
      completeOnboarding: () => set({ onboardingCompleted: true })
    }),
    { name: 'popup-store-auth', getStorage: () => localStorage }
  )
)
