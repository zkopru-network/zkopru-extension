declare global {
  interface Window {
    zkopru?: ZkopruProvider
  }
}

declare class ZkopruProvider {
  constructor()
  private _connected
  private _status
  get connected(): boolean
  get status(): BACKGROUND_STATUS
  connect(): void
  getBalance(): Promise<void>
  getAddress(): Promise<void>
  generateTransferTx(): Promise<void>
  generateSwapTx(): Promise<void>
  sendTx(): Promise<void>
  getBlockNumber(): Promise<void>
  private assertConnected
}
