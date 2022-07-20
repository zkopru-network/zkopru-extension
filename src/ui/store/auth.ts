import create from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  onboardingCompleted: boolean
  authenticated: boolean
  redirectPath: string | null
  redirectParams: string | null
  setAuthenticated: (authenticated: boolean) => void
  completeOnboarding: () => void
  setOnboardingCompleted: (completed: boolean) => void
  setRedirectPath: (path: string | null) => void
  setRedirectParams: (params: string | null) => void
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
  redirectPath: null,
  redirectParams: null,
  setAuthenticated: (authenticated) => set({ authenticated }),
  setRedirectPath: (path) => set({ redirectPath: path }),
  setRedirectParams: (params) => set({ redirectParams: params }),
  completeOnboarding: () => set({ onboardingCompleted: true }),
  setOnboardingCompleted: (completed: boolean) =>
    set({ onboardingCompleted: completed })
}))
