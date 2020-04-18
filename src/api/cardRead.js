import request from '@/utils/request'
export function readCard() {
  return request({
    url:'api/ReadMsg',
    method:'get'
  })
}
export function readCardReset() {
  return request({
    url:'api/M1Reset',
    method:'get'
  })
}
export function readCardData() {
  return request({
    url:'api/M1Reset',
    method:'get'
  })
}