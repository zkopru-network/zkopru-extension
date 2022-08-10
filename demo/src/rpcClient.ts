import axios from 'axios'
const ENDPOINT = 'http://127.0.0.1:8888'

class RpcClient {
  // TODO: set using coordinator address

  async getRegisteredTokens() {
    return await axios.post(ENDPOINT, {
      jsonrpc: '2.0',
      method: 'l2_getRegisteredTokens'
    })
  }

  async getL1Address() {
    return await axios.post(ENDPOINT, {
      jsonrpc: '2.0',
      method: 'l1_address'
    })
  }
}

export default new RpcClient()
