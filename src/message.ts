export const MESSAGE_TYPE = {
  WALLET_KEY_GENERATED: 'WALLET_KEY_GENERATED',
  GET_BALANCE_REQUEST: 'GET_BALANCE_REQUEST',
  GET_BALANCE_RESPONSE: 'GET_BALANCE_RESPONSE',
  GET_ADDRESS_REQUEST: 'GET_ADDRESS_REQUEST',
  GET_ADDRESS_RESPONSE: 'GET_ADDRESS_RESPONSE'
} as const

type MessageKey = keyof typeof MESSAGE_TYPE

// TODO: add meta data to manage request and response message relation
export type Message<T extends MessageKey, P> = {
  readonly type: T
  readonly payload: P
}

export type UntypedMessage = Message<MessageKey, unknown>

export type MessageWithPayload<P> = Message<MessageKey, P>

export type MessageWithoutPayload = Message<MessageKey, undefined>

type MessageCreator<P> = {
  type: MessageKey
  match: (message: UntypedMessage) => message is MessageWithPayload<P>
  (payload: P): MessageWithPayload<P>
}

type MessageCreatorWithoutPayload = {
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
}>('WALLET_KEY_GENERATED')
export const GetBalanceRequestMessageCreator = createMessage(
  'GET_BALANCE_REQUEST'
)
export const GetBalanceResponseMessageCreator = createMessage<{
  balance: number
}>('GET_BALANCE_RESPONSE')
export const GetAddressRequestMessageCreator = createMessage(
  'GET_ADDRESS_REQUEST'
)
export const GetAddressResponseMessageCreator = createMessage<{
  address: string
}>('GET_ADDRESS_RESPONSE')
