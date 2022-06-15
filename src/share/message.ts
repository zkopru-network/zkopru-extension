import { BACKGROUND_STATUS } from './constants'
import type { DepositData } from './types'

export const MESSAGE_TYPE = {
  WALLET_KEY_GENERATED: 'WALLET_KEY_GENERATED',
  GET_BALANCE_REQUEST: 'GET_BALANCE_REQUEST',
  GET_BALANCE_RESPONSE: 'GET_BALANCE_RESPONSE',
  GET_ADDRESS_REQUEST: 'GET_ADDRESS_REQUEST',
  GET_ADDRESS_RESPONSE: 'GET_ADDRESS_RESPONSE',
  GET_BACKGROUND_STATUS_REQUEST: 'GET_BACKGROUND_STATUS_REQUEST',
  GET_BACKGROUND_STATUS_RESPONSE: 'GET_BACKGROUND_STATUS_RESPONSE',
  REGISTER_PASSWORD_REQUEST: 'REGISTER_PASSWORD_REQUEST',
  REGISTER_PASSWORD_RESPONSE: 'REGISTER_PASSWORD_RESPONSE',
  VERIFY_PASSWORD_REQUEST: 'VERIFY_PASSWORD_REQUEST',
  VERIFY_PASSWORD_RESPONSE: 'VERIFY_PASSWORD_RESPONSE',
  DEPOSIT_ETH_REQUEST: 'DEPOSIT_ETH_REQUEST',
  DEPOSIT_ETH_RESPONSE: 'DEPOSIT_ETH_RESPONSE'
} as const

// type MessageKey = keyof typeof MESSAGE_TYPE
type MessageKey = typeof MESSAGE_TYPE[keyof typeof MESSAGE_TYPE]

// TODO: add meta data to manage request and response message relation
export type Message<T extends MessageKey, P> = {
  readonly type: T
  readonly payload: P
}

export type UntypedMessage = Message<MessageKey, unknown>

export type MessageWithPayload<P> = Message<MessageKey, P>

export type MessageWithoutPayload = Message<MessageKey, undefined>

export type MessageCreator<P> = {
  type: MessageKey
  match: (message: UntypedMessage) => message is MessageWithPayload<P>
  (payload: P): MessageWithPayload<P>
}

export type MessageCreatorWithoutPayload = {
  type: MessageKey
  match: (message: UntypedMessage) => message is MessageWithoutPayload
  (): MessageWithoutPayload
}

function createMessage(type: MessageKey): MessageCreatorWithoutPayload
function createMessage<P>(type: MessageKey): MessageCreator<P>

function createMessage<P>(type: MessageKey) {
  function messageCreator(...args: any[]): MessageWithPayload<P> {
    return <const>{
      type,
      payload: args[0]
    }
  }

  messageCreator.match = (
    message: UntypedMessage
  ): message is MessageWithPayload<P> => message.type === type

  messageCreator.type = type

  messageCreator.toString = () => `${type}`

  return messageCreator
}

export const WalletKeyGeneratedMessageCreator = createMessage<{
  walletKey: string
}>(MESSAGE_TYPE.WALLET_KEY_GENERATED)
export const GetBalanceRequestMessageCreator = createMessage(
  MESSAGE_TYPE.GET_BALANCE_REQUEST
)
export const GetBalanceResponseMessageCreator = createMessage<{
  balance: string
}>(MESSAGE_TYPE.GET_BALANCE_RESPONSE)
export const GetAddressRequestMessageCreator = createMessage(
  MESSAGE_TYPE.GET_ADDRESS_REQUEST
)
export const GetAddressResponseMessageCreator = createMessage<{
  address: string
}>(MESSAGE_TYPE.GET_ADDRESS_RESPONSE)
export const GetBackgroundStatusRequest = createMessage(
  MESSAGE_TYPE.GET_BACKGROUND_STATUS_REQUEST
)
export const GetBackgroundStatusResponse = createMessage<{
  status: BACKGROUND_STATUS
}>(MESSAGE_TYPE.GET_BACKGROUND_STATUS_RESPONSE)
export const RegisterPasswordRequest = createMessage<{ password: string }>(
  MESSAGE_TYPE.REGISTER_PASSWORD_REQUEST
)
export const RegisterPasswordResponse = createMessage(
  MESSAGE_TYPE.REGISTER_PASSWORD_RESPONSE
)
export const VerifyPasswordRequest = createMessage<{ password: string }>(
  MESSAGE_TYPE.VERIFY_PASSWORD_REQUEST
)
export const VerifyPasswordResponse = createMessage<{ result: boolean }>(
  MESSAGE_TYPE.VERIFY_PASSWORD_RESPONSE
)
export const DepositEthRequest = createMessage<{
  data: DepositData
}>(MESSAGE_TYPE.DEPOSIT_ETH_REQUEST)
export const DepositEthResponse = createMessage<{
  params: { to: string; data: string; value: string }
}>(MESSAGE_TYPE.DEPOSIT_ETH_RESPONSE)
