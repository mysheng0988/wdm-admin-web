import request from '@/utils/request'
export function getHomeData() {
  return request({
    url:'ips/statistics/index',
    method:'get',
  })
}

