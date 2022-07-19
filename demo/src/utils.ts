import BN from 'bn.js'

export function toWei(amount: string | number | BN): string {
  const decimalIndex = amount.toString().indexOf('.')
  let decimalCount = 0
  if (decimalIndex !== -1) {
    decimalCount = amount.toString().length - decimalIndex
  }
  const baseAmount = Math.floor(+amount.toString() * 10 ** decimalCount)
  const wei = new BN(baseAmount.toString()).mul(
    new BN('10').pow(new BN(18 - decimalCount))
  )
  return wei.toString()
}

export function fromWei(amount: string | number | BN, decimals = 3): number {
  let bnAmount
  if (typeof amount === 'string' && amount.indexOf('0x') === 0) {
    bnAmount = new BN(amount.slice(2), 16)
  } else {
    bnAmount = new BN(amount)
  }
  const finney = bnAmount.div(new BN(`${10 ** (18 - decimals)}`)).toString()
  const ether = +finney / 10 ** decimals
  return ether
}
