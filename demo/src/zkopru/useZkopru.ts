import { useState, useEffect } from 'react'
import detectZkopru, { ZkopruProvider } from './detectZkopru'

export function useZkopru() {
  const [zkopru, setZkopru] = useState<ZkopruProvider | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    window.addEventListener('ZKOPRU#PROVIDER_CONNECTED', () => {
      setActive(true)
    })
    ;(async () => {
      const zkopru = await detectZkopru()
      setActive(zkopru?.connected || false)
      setZkopru(zkopru)
    })()
  }, [])
  // detect zkopru and return if exists

  return { zkopru, active }
}
