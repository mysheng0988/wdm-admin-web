import request from '@/utils/request'
export function readCard() {
  return request({
    url:'base/api/id',
    method:'get'
  })
}
export function readCardReset() {
  return request({
    url:'base/api/m1',
    method:'get'
  })
}
export function readCardData() {
  return request({
    url:'api/M1ReadBlock?BlockNo=9',
    method:'get'
  })
}
