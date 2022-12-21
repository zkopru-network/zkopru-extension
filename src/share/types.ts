export type DepositData = {
  amount: string
  fee: string
}

export type DepositERC20Data = {
  amount: string
  fee: string
  address: string
}

export type DepositERC721Data = {
  tokenId: string
  fee: string
  address: string
}

export type L1TxParams = {
  to: string
  data: string
  value: string
}

export type TokenBalances = {
  [key: string]: number
}

export type L2Balance = {
  eth: number
  tokenBalances: TokenBalances
  lockedTokenBalances: TokenBalances
}

export type ERC20Info = {
  address: string
  symbol: string
  decimals: number
}

// TODO: type correctly
export type Activity = any
