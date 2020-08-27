import request from '@/utils/request'
export function makeCardData(data) {
  return request({
    url:'ips/card',
    method:'get',
    params:data
  })
}
export function getCardData(data) {
  return request({
    url:'ips/card/list',
    method:'get',
    params:data
  })
}
