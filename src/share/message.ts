import { BACKGROUND_STATUS } from './constants'
import type { DepositData, DepositERC20Data, TokenBalances } from './types'

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
  DEPOSIT_ETH_RESPONSE: 'DEPOSIT_ETH_RESPONSE',
  DEPOSIT_ERC20_REQUEST: 'DEPOSIT_ERC20_REQUEST',
  DEPOSIT_ERC20_RESPONSE: 'DEPOSIT_ERC20_RESPONSE',

  TRANSFER_ETH_REQUEST: 'TRANSFER_ETH_REQUEST',
  TRANSFER_ETH_RESPONSE: 'TRANSFER_ETH_RESPONSE',
  WITHDRAW_ETH_REQUEST: 'WITHDRAW_ETH_REQUEST',
  WITHDRAW_ETH_RESPONSE: 'WITHDRAW_ETH_RESPONSE',
  LOAD_ACTIVITY_REQUEST: 'LOAD_ACTIVITY_REQUEST',
  LOAD_ACTIVITY_RESPONSE: 'LOAD_ACTIVITY_RESPONSE',

  CONFIRM_CONNECT_SITE: 'CONFIRM_CONNECT_SITE',
  CONNECT_SITE_REQUEST: 'CONNECT_SITE_REQUEST',
  CONNECT_SITE_RESPONSE: 'CONNECT_SITE_RESPONSE',
  IS_CONNECTED_REQUEST: 'IS_CONNECTED_REQUEST',
  IS_CONNECTED_RESPONSE: 'IS_CONNECTED_RESPONSE',
  GET_CONNECTED_SITES_REQUEST: 'GET_CONNECTED_SITES_REQUEST',
  GET_CONNECTED_SITES_RESPONSE: 'GET_CONNECTED_SITES_RESPONSE',
  SITE_CONNECTED: 'SITE_CONNECTED',

  CONFIRIM_POPUP: 'CONFIRM_POPUP',

  DEBUG: 'DEBUG'
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
  l1Address: string
}>(MESSAGE_TYPE.WALLET_KEY_GENERATED)

export const GetBalanceRequestMessageCreator = createMessage(
  MESSAGE_TYPE.GET_BALANCE_REQUEST
)

export const GetBalanceResponseMessageCreator = createMessage<{
  eth: string
  tokenBalances: TokenBalances
  lockedTokenBalances: TokenBalances
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

export const DepositERC20Request = createMessage<{
  data: DepositERC20Data
}>(MESSAGE_TYPE.DEPOSIT_ERC20_REQUEST)

export const DepositERC20Response = createMessage<{
  params: { to: string; data: string; value: string }
}>(MESSAGE_TYPE.DEPOSIT_ERC20_RESPONSE)

export const TransferEthRequest = createMessage<{
  to: string
  amount: number
  fee: number
}>(MESSAGE_TYPE.TRANSFER_ETH_REQUEST)

export const TransferEthResponse = createMessage<{ hash: string }>(
  MESSAGE_TYPE.TRANSFER_ETH_RESPONSE
)

// TODO: add token field
export const WithdrawEthRequest = createMessage<{
  amount: number
  fee: number
  instantWithdrawFee: number
}>(MESSAGE_TYPE.WITHDRAW_ETH_REQUEST)

export const WithdrawEthResponse = createMessage<{ hash: string }>(
  MESSAGE_TYPE.WITHDRAW_ETH_RESPONSE
)

export const LoadActivityRequest = createMessage(
  MESSAGE_TYPE.LOAD_ACTIVITY_REQUEST
)

export const LoadActivityResponse = createMessage<{ activities: any[] }>(
  MESSAGE_TYPE.LOAD_ACTIVITY_RESPONSE
)

export const ConfirmConnectSite = createMessage<{
  origin: string
}>(MESSAGE_TYPE.CONFIRM_CONNECT_SITE)

export const ConnectSiteRequest = createMessage<{ origin: string }>(
  MESSAGE_TYPE.CONNECT_SITE_REQUEST
)

export const ConnectSiteResponse = createMessage<{
  result: boolean
}>(MESSAGE_TYPE.CONNECT_SITE_RESPONSE)

export const IsConnectedRequest = createMessage<{ origin: string }>(
  MESSAGE_TYPE.IS_CONNECTED_REQUEST
)

export const IsConnectedResponse = createMessage<{ isConnected: boolean }>(
  MESSAGE_TYPE.IS_CONNECTED_RESPONSE
)

export const GetConnectedSitesRequest = createMessage(
  MESSAGE_TYPE.GET_CONNECTED_SITES_REQUEST
)

export const GetConnectedSitesResponse = createMessage<{
  connectedSites: string[]
}>(MESSAGE_TYPE.GET_CONNECTED_SITES_RESPONSE)

export const SiteConnected = createMessage<{ origin: string }>(
  MESSAGE_TYPE.SITE_CONNECTED
)

export const ConfirmPopup = createMessage<{ path: string; params: any }>(
  MESSAGE_TYPE.CONFIRIM_POPUP
)

export const DebugMessage = createMessage<{ value: any }>(MESSAGE_TYPE.DEBUG)
