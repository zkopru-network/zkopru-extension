import { sha512_256 } from 'js-sha512'
import { waitUntil } from '../share/utils'
import { EVENT_NAMES, WALLET_KEY_MSG_PARAMS } from '../share/constants'

type Provider = {
  request: (arg: { method: string; params?: string[] }) => Promise<unknown>
}

declare global {
  interface Window {
    ethereum?: Provider
  }
}

// TODO: state management lib
type State = {
  selectedAddress: string | null
  walletKey: string | null
}

const initState = (): State => ({
  selectedAddress: null,
  walletKey: null
})

async function init() {
  const state = initState()

  // listen "ethereum#initialized" event on window object
  // or block on window.ethereum is set.
  // throw error if window.ethereum is never initialized
  // await waitUntil(() => (window as any).ethereum)
  await waitUntil(() => {
    return !!window.ethereum
  }, 500)
  const ethereum = window.ethereum as Provider

  // TODO: check if wallet key is stored in database

  console.log('[INPAGE] ethereum is initialized')

  // try eth_requestAccounts and get selected address
  try {
    const accounts = (await ethereum.request({
      method: 'eth_requestAccounts'
    })) as string[]
    if (accounts.length === 0) {
      throw new Error('No Account connected to the site')
    }
    state.selectedAddress = accounts[0]
  } catch (e) {
    console.error('[INPAGE] Zkopru: Metamask connection failed:', e)
    return
  }

  // request wallet key signature
  try {
    const signedData = (await ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [state.selectedAddress, WALLET_KEY_MSG_PARAMS]
    })) as string
    const walletKey = sha512_256(signedData)
    state.walletKey = walletKey
  } catch (e) {
    console.error('[INPAGE] Zkopru: signature rejected:', e)
    return
  }

  console.log('[INPAGE] Finish generating wallet key', state.walletKey)

  // send generated wallet key to background script
  window.dispatchEvent(
    new CustomEvent(EVENT_NAMES.WALLET_KEY_GENERATED, {
      detail: { walletKey: state.walletKey }
    })
  )
}

init()
