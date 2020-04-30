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
    url:'api/M1ReadBlock?BlockNo=9',
    method:'get'
  })
}
export function M1WriteBlock(){
  return request({
    url:"api/M1WriteBlock?BlockNo=9&Data=11223344556677889900112233445566",
    method:'get'
  })
}
