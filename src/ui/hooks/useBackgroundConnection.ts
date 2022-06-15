import { useContext } from 'react'
import { BackgroundContext } from '../backgroundConnection'

export default function useBackgroundConnection() {
  return useContext(BackgroundContext)
}
