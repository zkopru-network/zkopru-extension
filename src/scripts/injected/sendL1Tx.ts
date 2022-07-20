import { EVENT_NAMES } from '../../share/events'
import { isCustomEvent, waitUntil } from '../../share/utils'

type Provider = {
  request: (arg: { method: string; params?: string[] }) => Promise<unknown>
}

window.addEventListener(EVENT_NAMES.SEND_TX, async (e: Event) => {
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

  // TODO: typing
  const data = (window as any).txParams
  await ethereum.request({
    method: 'eth_sendTransaction',
    params: [{ ...data, from: account }]
  })
})
