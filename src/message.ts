// TODO: better way to organize messages

export const MESSAGE_TYPE = {
  WALLET_KEY_GENERATED: 'WALLET_KEY_GENERATED',
  GET_BALANCE_REQUEST: 'GET_BALANCE_REQUEST',
  GET_BALANCE_RESPONSE: 'GET_BALANCE_RESPONSE',
  GET_ADDRESS_REQUEST: 'GET_ADDRESS_REQUEST',
  GET_ADDRESS_RESPONSE: 'GET_ADDRESS_RESPONSE'
} as const

export type Message<s extends keyof typeof MESSAGE_TYPE, T> = {
  type: s
  payload: T
}

export type UntypedMessage = Message<keyof typeof MESSAGE_TYPE, unknown>

// function generateMessageCreator<T extends keyof typeof MESSAGE_TYPE, P>(
//   type: T,
//   payload: P
// ) {}

/// WalletKeyGeneratedMessage Definition
/// Type, type guard, factory method
export type WalletKeyGeneratedMessage = Message<
  'WALLET_KEY_GENERATED',
  { walletKey: string }
>

export const isWalletKeyGeneratedMessage = (
  message: UntypedMessage
): message is WalletKeyGeneratedMessage => {
  return message.type === MESSAGE_TYPE.WALLET_KEY_GENERATED
}

export const walletKeyGeneratedMessageFactory = (
  walletKey: string
): WalletKeyGeneratedMessage => ({
  type: MESSAGE_TYPE.WALLET_KEY_GENERATED,
  payload: { walletKey }
})

/// GetBalanceRequest Definition
/// Type, type guard, factory method
export type GetBalanceRequestMessage = Message<'GET_BALANCE_REQUEST', null>

export const isGetBalanceRequestMessage = (
  message: UntypedMessage
): message is GetBalanceRequestMessage => {
  return message.type === MESSAGE_TYPE.GET_BALANCE_REQUEST
}

export const getBalanceRequestMessageFactory =
  (): GetBalanceRequestMessage => ({
    type: MESSAGE_TYPE.GET_BALANCE_REQUEST,
    payload: null
  })

/// GetBalanceResponse Definition
/// Type, type guard, factory method
export type GetBalanceResponseMessage = Message<
  'GET_BALANCE_RESPONSE',
  { balance: number }
>

export const isGetBalanceResponseMessage = (
  message: UntypedMessage
): message is GetBalanceResponseMessage => {
  return message.type === MESSAGE_TYPE.GET_BALANCE_RESPONSE
}

export const getBalanceResponseMessageFactory = (
  balance: number
): GetBalanceResponseMessage => ({
  type: MESSAGE_TYPE.GET_BALANCE_RESPONSE,
  payload: { balance }
})

export type GetAddressRequestMessage = Message<'GET_ADDRESS_REQUEST', null>

export const isGetAddressRequestMessage = (
  message: UntypedMessage
): message is GetAddressRequestMessage => {
  return message.type === MESSAGE_TYPE.GET_ADDRESS_REQUEST
}

export const getAddressRequestMessageFactory =
  (): GetAddressRequestMessage => ({
    type: MESSAGE_TYPE.GET_ADDRESS_REQUEST,
    payload: null
  })

export type GetAddressResponseMessage = Message<
  'GET_ADDRESS_RESPONSE',
  { address: string }
>

export const isGetAddressResponseMessage = (
  message: UntypedMessage
): message is GetAddressResponseMessage => {
  return message.type === MESSAGE_TYPE.GET_ADDRESS_RESPONSE
}

export const getAddressResponseMessageFactory = (
  address: string
): GetAddressResponseMessage => ({
  type: MESSAGE_TYPE.GET_ADDRESS_RESPONSE,
  payload: { address }
})
