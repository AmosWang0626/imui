import {
  request
} from '@/utils/request'

export function getServerLogs() {
  return request({
    method: 'get',
    url: '/server/logs'
  })
}

export function getServerWS() {
  return request({
    method: 'get',
    url: '/server/ws'
  })
}