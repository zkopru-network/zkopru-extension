export const ALLOW_ORIGIN_LIST = ['https://zkopru.network']

export const WALLET_KEY_MSG_PARAMS = JSON.stringify({
  domain: {
    chainId: 1337,
    name: 'Zkopru Testnet',
    version: '0'
  },
  message: {
    info: 'Unlock Zkopru wallet',
    warning:
      'This signature is your private key, only sign on official Zkopru websites!'
  },
  primaryType: 'ZkopruKey',
  types: {
    ZkopruKey: [
      { name: 'info', type: 'string' },
      { name: 'warning', type: 'string' }
    ]
  }
})

export const WEBSOCKET_URL = 'ws://localhost:5000'
// export const WEBSOCKET_URL = 'wss://goerli2.zkopru.network'

export const ZKOPRU_CONTRACT = '0x970e8f18ebfEa0B08810f33a5A40438b9530FBCF'

/// custom event names
/// used to exchange messages between injected script and content script
export const EVENT_NAMES = {
  WALLET_KEY_GENERATED: 'ZKOPRU#WALLET_KEY_GENERATED'
} as const

export const ROUTES = {
  HOME: '/',
  ONBOARDING: '/onboarding',
  UNLOCK: '/unlock',
  TRANSFER: '/transfer'
} as const

export enum BACKGROUND_STATUS {
  NOT_ONBOARDED = 'NOT_ONBOARDED',
  INITIALIZING = 'INITIALIZING',
  INITIALIZED = 'INITIALIZED',
  SYNCING = 'SYNCING',
  SYNCED = 'SYNCED'
}
