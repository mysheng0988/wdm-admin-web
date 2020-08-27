import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/user/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertUser(data) {
  return request({
    url:'/pss/user',
    method:'post',
    data:data
  })
}

export function updateUser(data) {
  return request({
    url:'/pss/organ/modify',
    method:'put',
    data:data
  })
}
