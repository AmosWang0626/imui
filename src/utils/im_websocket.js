export const ImServerWS = "server_ws"
import { getServerWsUrl } from '@/api/server'

// 共享Websocket
let ws

/**
 * 获取 Websocket 连接
 * @param {*} imServer im server 地址
 */
export function getWebsocket() {
  if (ws) {
    return Promise.resolve(ws)
  }

  return getServerWsUrl().then(res => {
    if (!res.status == 200) {
      console.error('获取Netty服务端地址异常')
      return
    }
    if (res.data) {
      let address = 'ws://' + res.data + '/ws'
      ws = new WebSocket(address)
      console.info('>>>>> Netty Server 地址为: ' + address)
    }
    ws.onopen = function () {
      console.info('WebSocket 连接成功')
    }

    ws.onclose = function () {
      console.info('WebSocket 连接已关闭')
      clearWebsocket()
    }

    return ws
  })
}

/**
 * 清空 WebSocket
 */
export function clearWebsocket() {
  ws = null
  localStorage.clear()
  console.info('>>>>> 清空 WebSocket')
}