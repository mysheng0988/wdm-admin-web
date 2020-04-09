import request from '@/utils/request'
export function getICD11(data) {
  return request({
    url:'base/icd/list',
    method:'get',
    params:{queryParam:data}
  })
}

