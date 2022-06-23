import BN from 'bn.js'

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setInterval(resolve, ms)
  })
}

/**
 * @description wait until predicate returns true. checks every *interval* ms
 * @param  predicate checks every *interval* ms. if this function returns true, promise resolves
 * @param  interval every miliseconds predicate is checked
 */
export async function waitUntil(
  predicate: () => boolean,
  interval = 1000
): Promise<void> {
  return new Promise((resolve) => {
    const poll = () => {
      if (predicate()) {
        resolve()
      } else {
        setTimeout(poll, interval)
      }
    }
    poll()
  })
}

/**
 * @description async predicate verison of waitUntil
 */
export async function waitUntilAsync(
  predicate: () => Promise<boolean>,
  interval = 1000
) {
  while (!(await predicate())) {
    await sleep(interval)
  }
}

/**
 * @param  {Event} event
 * @returns eventisCustomEvent
 */
export function isCustomEvent(event: Event): event is CustomEvent {
  return 'detail' in event
}

///  Logging utilities

export function logDoNothingFor(
  reason: string,
  option?: {
    scriptName?: string
  }
) {
  console.log(option?.scriptName || '', 'DO NOTHING: ', reason)
}

export function logNewMessage<M>(
  message: M,
  option?: {
    scriptName?: string
  }
) {
  console.log(option?.scriptName || '', 'incoming message: ', message)
}

export function shortenAddress(address = ''): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
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

export function toGwei(amount: string | number | BN): string {
  const wei = toWei(amount)
  return wei.slice(0, wei.length - 9)
}
