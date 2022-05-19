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

export function shortenAddress(address: string): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
}
