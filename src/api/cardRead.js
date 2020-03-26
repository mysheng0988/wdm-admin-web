import request from '@/utils/request'
export function readCard() {
  return request({
    url:'api/ReadMsg',
    method:'get'
  })
}
export function readCardMsg() {
  return request({
    url:'base/api/ReadMsg',
    method:'get'
  })
}