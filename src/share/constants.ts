export const ALLOW_ORIGIN_LIST = [
  'https://zkopru.network',
  'http://localhost:3000'
]

export const ONBOARDING_URL = 'http://localhost:3000'

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
  GENERATE_WALLET_KEY: 'ZKOPRU#GENERATE_WALLET_KEY',
  WALLET_KEY_GENERATED: 'ZKOPRU#WALLET_KEY_GENERATED',
  DEPOSIT_ETH: 'ZKOPRU#DEPOSIT_ETH',
  SEND_TX: 'ZKOPRU#SEND_TX',

  CONNECTED: 'ZKOPRU#CONNECTED',

  SET_PROVIDER: 'ZKOPRU#SET_PROVIDER',

  PROVIDER_CONNECTED: 'ZKOPRU#PROVIDER_CONNECTED'
} as const

export const PROVIDER_EVENT_NAMES = {
  CONFIRM_POPUP: 'ZKOPRU_PROVIDER#CONFIRM_POPUP',
  CONNECT: 'ZKOPRU_PROVIDER#CONNECT'
} as const

export const ROUTES = {
  HOME: '/',
  ONBOARDING: '/onboarding',
  UNLOCK: '/unlock',
  TRANSFER: '/transfer',
  TRANSFER_CONFIRM: '/transfer/confirm',
  TRANFER_COMPLETE: '/transfer/complete',
  WITHDRAW: '/withdraw',
  WITHDRAW_COMPLETE: '/withdraw/complete',
  ACTIVITY: '/activity',
  CONFIRM_CONNECTION: '/confirm-connection'
} as const

export enum BACKGROUND_STATUS {
  STARTINGUP = 'STARGINGUP',
  NOT_ONBOARDED = 'NOT_ONBOARDED',
  NEED_KEY_GENERATION = 'NEED_KEY_GENERATION',
  LOADING = 'LOADING',
  INITIALIZED = 'INITIALIZED',
  SYNCING = 'SYNCING',
  SYNCED = 'SYNCED'
}

export const TIMEOUT = 180000

// TODO: set moderate unlock time maybe an hour or two
export const UNLOCK_TIMEOUT = 3600000
