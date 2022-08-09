import { EVENT_NAMES } from '../../share/events'
import { isCustomEvent, waitUntil } from '../../share/utils'

type Provider = {
  request: (arg: { method: string; params?: string[] }) => Promise<unknown>
}

window.addEventListener(EVENT_NAMES.SEND_TX, async (e: Event) => {
  console.log('send tx called')
  if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')

  await waitUntil(() => {
    return !!window.ethereum
  }, 500)
  const ethereum = window.ethereum as Provider

  const accounts = (await ethereum.request({
    method: 'eth_requestAccounts'
  })) as string[]
  if (accounts.length === 0) {
    throw new Error('No Account connected to the site')
  }
  const account = accounts[0]

  const data = (window as any).txParams
  try {
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [{ ...data, from: account }]
    })
  } catch (e) {
    console.error('[SEND L1 TX] send transaction failed with data', data)
  }
})
