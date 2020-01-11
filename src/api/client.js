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