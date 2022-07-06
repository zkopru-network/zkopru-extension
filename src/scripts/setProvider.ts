import { EVENT_NAMES, BACKGROUND_STATUS, ROUTES } from '../share/constants'

declare global {
  interface Window {
    zkopru?: L2Provider
  }
}

class L2Provider {
  constructor() {
    window.addEventListener(EVENT_NAMES.CONNECTED, (e) => {
      if ((window as any).connectedSite === window.location.origin) {
        this._connected = true
        window.dispatchEvent(new Event(EVENT_NAMES.PROVIDER_CONNECTED))
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

  async transferEth(to: string, amount: string) {
    this.assertConnected()
    window.dispatchEvent(
      new CustomEvent(EVENT_NAMES.CONFIRM_POPUP, {
        detail: { path: ROUTES.TRANSFER_CONFIRM, params: { to, amount } }
      })
    )
  }

  async transferERC20(to: string, token: string, amount: string) {
    this.assertConnected()
  }

  async swap() {
    this.assertConnected()
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
  window.dispatchEvent(new Event(EVENT_NAMES.SET_PROVIDER))
}

setProvider()
