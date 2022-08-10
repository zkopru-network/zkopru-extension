import { BACKGROUND_STATUS } from '../../share/constants'
import { EVENT_NAMES, PROVIDER_EVENT_NAMES } from '../../share/events'
import { L2Balance } from '../../share/types'
import ROUTES from '../../routes'

class ZkopruProvider {
  constructor() {
    window.addEventListener(EVENT_NAMES.CONNECTED, (e) => {
      if (window.connectedSite === window.location.origin) {
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
    this.dispatch(PROVIDER_EVENT_NAMES.CONNECT, { origin })
  }

  async getBalance() {
    this.assertConnected()

    const res = await this.dispatchAndListen<L2Balance>(
      PROVIDER_EVENT_NAMES.BALANCE_REQUEST,
      PROVIDER_EVENT_NAMES.BALANCE_RESPONSE
    )
    return res
  }

  async getAddress() {
    this.assertConnected()

    const res = await this.dispatchAndListen<string>(
      PROVIDER_EVENT_NAMES.ADDRESS_REQUEST,
      PROVIDER_EVENT_NAMES.ADDRES_RESPONSE
    )
    return res
  }

  async transferEth(to: string, amount: string) {
    this.assertConnected()
    this.dispatch(PROVIDER_EVENT_NAMES.CONFIRM_POPUP, {
      path: ROUTES.TRANSFER_CONFIRM,
      params: { to, amount }
    })
  }

  async transferERC20(to: string, token: string, amount: string) {
    this.assertConnected()
  }

  async swap(
    sendToken: string,
    sendAmount: string,
    receiveToken: string,
    receiveAmount: string,
    counterParty: string,
    salt: number,
    fee: string
  ) {
    this.assertConnected()
    this.dispatch(PROVIDER_EVENT_NAMES.CONFIRM_POPUP, {
      path: ROUTES.SWAP_CONFIRM,
      params: {
        sendToken,
        sendAmount,
        receiveToken,
        receiveAmount,
        counterParty,
        salt,
        fee
      }
    })
  }

  async getBlockNumber() {
    this.assertConnected()
  }

  private assertConnected() {
    if (!this.connected) throw new Error('Site not connected')
  }

  private dispatch(
    eventName: typeof PROVIDER_EVENT_NAMES[keyof typeof PROVIDER_EVENT_NAMES],
    params: any
  ) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: params }))
  }

  private async dispatchAndListen<T>(
    eventName: typeof PROVIDER_EVENT_NAMES[keyof typeof PROVIDER_EVENT_NAMES],
    resEventName: typeof PROVIDER_EVENT_NAMES[keyof typeof PROVIDER_EVENT_NAMES],
    params: any = {}
  ): Promise<T> {
    return new window.Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
        // TODO: check if type of event is provider response event type
        if (e.data.eventName === resEventName) {
          resolve(e.data.payload)
        }
      })

      window.dispatchEvent(new CustomEvent(eventName, { detail: params }))
    })
  }
}

function setProvider() {
  window.zkopru = new ZkopruProvider()
  window.dispatchEvent(new Event(EVENT_NAMES.SET_PROVIDER))
}

setProvider()
