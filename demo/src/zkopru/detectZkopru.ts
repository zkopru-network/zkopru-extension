declare global {
  interface Window {
    zkopru?: ZkopruProvider
  }
}

export declare class ZkopruProvider {
  constructor()
  get connected(): boolean
  connect(): void
  getBalance(): Promise<void>
  getAddress(): Promise<void>
  transferEth(to: string, amount: string): Promise<void>
  transferERC20(to: string, token: string, amount: string): Promise<void>
  swap(): Promise<void>
  getBlockNumber(): Promise<void>
}

/**
 * detect zkopru provider within ginven timeout
 * @returns if zkopru extension is installed in browser, returns it, otherwise returns undefined
 */
export default async function detectZkopru(
  timeout = 3000
): Promise<ZkopruProvider | null> {
  let resolved = false

  return new Promise((resolve, reject) => {
    const handleProvider = () => {
      if (window.zkopru && !resolved) {
        resolved = true
        window.removeEventListener('ZKOPRU#SET_PROVIDER', handleProvider)
        resolve(window.zkopru)
      } else {
        resolve(null)
      }
    }

    if (window.zkopru) {
      handleProvider()
    } else {
      // add event lisetener
      window.addEventListener('ZKOPRU#SET_PROVIDER', handleProvider, {
        once: true
      })

      setTimeout(handleProvider, timeout)
    }
  })
}
