export const ImServerWS = "server_ws"
import { getServerWsUrl } from '@/api/server'

/**
 * 获取 Websocket 连接
 * @param {*} imServer im server 地址
 */
export function getWebsocket() {
  const baseUrl = localStorage.getItem(ImServerWS)
  if (localStorage.getItem(ImServerWS)) {
    return Promise.resolve(getBaseWebsocket(baseUrl))
  }

  return getServerWsUrl().then(res => {
    if (!res.status == 200) {
      console.error('获取Netty服务端地址异常')
      return
    }
    if (res.data) {
      localStorage.setItem(ImServerWS, res.data)
      return getBaseWebsocket(res.data)
    }

    return null
  })
}

function getBaseWebsocket(baseUrl) {
  let address = 'ws://' + baseUrl + '/ws'
  let ws = new WebSocket(address)
  ws.onopen = function () {
    console.info('WebSocket 连接成功')
  }

  ws.onclose = function () {
    console.info('WebSocket 连接已关闭')
  }

  return ws
}