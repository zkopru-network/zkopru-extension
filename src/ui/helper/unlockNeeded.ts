import browser from 'webextension-polyfill'
import { UNLOCK_TIMEOUT } from '../../share/constants'

export async function checkUnlockNeeded(): Promise<boolean> {
  const now = new Date().getTime()
  const db = await browser.storage.local.get('unlocktime')

  // never unlocked
  if (!db.unlocktime) return true

  return now - db.unlocktime > UNLOCK_TIMEOUT
}
