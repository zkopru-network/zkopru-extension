// TODO: better way to organize messages

export const MESSAGE_TYPE = {
  WALLET_KEY_GENERATED: 'WALLET_KEY_GENERATED',
  GET_BALANCE_REQUEST: 'GET_BALANCE_REQUEST',
  GET_BALANCE_RESPONSE: 'GET_BALANCE_RESPONSE'
} as const

export type Message<s extends keyof typeof MESSAGE_TYPE, T> = {
  type: s
  payload: T
}

export type UntypedMessage = Message<keyof typeof MESSAGE_TYPE, unknown>

/// WalletKeyGeneratedMessage Definition
/// Type, type guard, factory method
export type WalletKeyGeneratedMessage = Message<
  'WALLET_KEY_GENERATED',
  { walletKey: string }
>

export function isWalletKeyGeneratedMessage(
  message: UntypedMessage
): message is WalletKeyGeneratedMessage {
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

export function isGetBalanceRequestMessage(
  message: UntypedMessage
): message is GetBalanceRequestMessage {
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

export function isGetBalanceResponseMessage(
  message: UntypedMessage
): message is GetBalanceResponseMessage {
  return message.type === MESSAGE_TYPE.GET_BALANCE_RESPONSE
}

export const getBalanceResponseMessageFactory = (
  balance: number
): GetBalanceResponseMessage => ({
  type: MESSAGE_TYPE.GET_BALANCE_RESPONSE,
  payload: { balance }
})
