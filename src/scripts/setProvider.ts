import { EVENT_NAMES, BACKGROUND_STATUS } from '../share/constants'
import { isCustomEvent } from '../share/utils'

declare global {
  interface Window {
    zkopru?: L2Provider
  }
}

class L2Provider {
  constructor() {
    window.addEventListener(EVENT_NAMES.CONNECTED, (e) => {
      if (!isCustomEvent(e)) throw new Error('Zkopru: invalid event value')
      // window.connectedSite must be passed by content script
      // by using cloneInto
      if ((window as any).connectedSite === window.location.origin) {
        this._connected = true
      }
    })

    // TODO: subscribe background status update
  }

  private _connected = false
  private _status = BACKGROUND_STATUS.STARTINGUP

  get connected() {
    return this._connected
  }

  get status() {
    return this._status
  }

  connect() {
    const origin = window.location.origin

    window.dispatchEvent(
      new CustomEvent(EVENT_NAMES.CONNECT, { detail: { origin } })
    )
  }

  async getBalance() {
    this.assertConnected()
  }

  async getAddress() {
    this.assertConnected()
  }

  async generateTransferTx() {
    this.assertConnected()
  }

  async generateSwapTx() {
    this.assertConnected()
  }

  async sendTx() {
    this.assertConnected()
    // TODO: show popup
  }

  async getBlockNumber() {
    this.assertConnected()
  }

  private assertConnected() {
    if (!this.connected) throw new Error('Site not connected')
  }
}

function setProvider() {
  window.zkopru = new L2Provider()
}

setProvider()
