import request from '@/utils/request'
export function readCard() {
  return request({
    url:'api/ReadMsg',
    method:'get'
  })
}