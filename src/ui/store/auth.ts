import create from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  onboardingCompleted: boolean
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => void
  completeOnboarding: () => void
  setOnboardingCompleted: (completed: boolean) => void
}

// export const useAuthStore = create<Store, [['zustand/persist', Store]]>(
//   persist(
//     (set) => ({
//       onboardingCompleted: false,
//       authenticated: false,
//       setAuthenticated: (authenticated) => set({ authenticated }),
//       completeOnboarding: () => set({ onboardingCompleted: true })
//     }),
//     { name: 'popup-store-auth', getStorage: () => localStorage }
//   )
// )

export const useAuthStore = create<Store>((set) => ({
  onboardingCompleted: false,
  authenticated: false,
  setAuthenticated: (authenticated) => set({ authenticated }),
  completeOnboarding: () => set({ onboardingCompleted: true }),
  setOnboardingCompleted: (completed: boolean) =>
    set({ onboardingCompleted: completed })
}))
