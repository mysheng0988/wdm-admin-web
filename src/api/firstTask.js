import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/preScreenTask/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertTask(data) {
  return request({
    url:'/pss/preScreenTask',
    method:'post',
    data:data
  })
}

export function updateTask(data) {
  return request({
    url:'/pss/preScreenTask',
    method:'put',
    data:data
  })
}
export function getPersonalList(roleId) {
  return request({
    url:'base/user/findUsersByName/'+roleId,
    method:'post',
  })
}