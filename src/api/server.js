import {
  request
} from '@/utils/request'

export function getServerLogs() {
  return request({
    method: 'get',
    url: '/server/logs'
  })
}

export function getServerWsUrl() {
  return request({
    method: 'get',
    url: '/server/ws'
  })
}