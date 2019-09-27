import {
  request
} from '@/utils/request'

export function getServerLogs() {
  return request({
    methods: 'get',
    url: '/server/logs'
  })
}

export function startServer() {
  return request({
    methods: 'get',
    url: '/server/start'
  })
}