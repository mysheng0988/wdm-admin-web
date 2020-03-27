import request from '@/utils/request'
export function readCard() {
  return request({
    url:'api/ReadMsg',
    method:'get'
  })
}
export function readCardMI() {
  return request({
    url:'api/M1Reset',
    method:'get'
  })
}