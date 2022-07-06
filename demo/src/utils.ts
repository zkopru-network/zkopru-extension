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
