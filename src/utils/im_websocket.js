export const ImServerWS = "server_ws"

// 共享Websocket
let ws

/**
 * 获取 Websocket 连接
 * @param {*} imServer im server 地址
 */
export function getWebsocket() {
  if (ws) {
    return ws
  }

  const imServerWS = localStorage.getItem(ImServerWS)
  if (!imServerWS) {
    console.error('获取Netty服务端地址异常')
    return
  }
  console.info('>>>>> Netty Server 地址为: ' + imServerWS)

  ws = new WebSocket('ws://' + imServerWS + '/ws')
  ws.onopen = function () {
    console.info('WebSocket 连接成功')
  }

  ws.onclose = function () {
    console.info('WebSocket 连接已关闭')
    clearWebsocket()
  }

  return ws
}

/**
 * 清空 WebSocket
 */
export function clearWebsocket() {
  ws = null
}