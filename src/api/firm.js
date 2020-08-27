import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/manufacturer/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertFirm(data) {
  return request({
    url:'/pss/manufacturer/',
    method:'post',
    data:data
  })
}

export function updateFirm(data) {
  return request({
    url:'/pss/manufacturer/',
    method:'put',
    data:data
  })
}



export function getFirmList(data) {
  return request({
    url:'/pss/manufacturer/manufacturers',
    method:'get'
  })
}
