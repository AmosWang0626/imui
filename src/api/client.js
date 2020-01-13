import {
  request
} from '@/utils/request'

export function userLogin(data) {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

export function onlineUsers() {
  return request({
    method: 'get',
    url: '/user/list',
  })
}

export function chatAlone(data) {
  return request({
    method: 'post',
    url: '/alone',
    data
  })
}

export function chatRecord(data) {
  return request({
    method: 'post',
    url: '/alone/list',
    data
  })
}