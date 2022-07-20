type Provider = {
  request: (arg: { method: string; params?: string[] }) => Promise<unknown>
}

declare global {
  interface Window {
    ethereum?: Provider
    zkopru?: ZkopruProvider
    wrappedJSObject: any
    connectedSite?: string
  }

  declare let cloneInto: <T>(
    obj: T,
    targetScope: any,
    options?: CloneIntoOptions
  ) => T
}

export {}
