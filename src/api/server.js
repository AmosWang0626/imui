import {
  request
} from '@/utils/request'

export function getServerLogs() {
  return request({
    method: 'get',
    url: '/server/logs'
  })
}

export function startServer() {
  return request({
    method: 'get',
    url: '/server/start'
  })
}