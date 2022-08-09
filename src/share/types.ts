export type DepositData = {
  amount: string
  fee: string
}

export type DepositERC20Data = {
  amount: string
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

// TODO: type correctly
export type Activity = any
