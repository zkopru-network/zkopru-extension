import create from 'zustand'

const rootStore = create((set) => ({
  count: 0
}))

export default rootStore
