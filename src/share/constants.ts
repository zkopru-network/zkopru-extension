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
