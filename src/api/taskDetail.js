import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/preScreenTaskDetail/details/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function updateModifyStudent(data) {
  return request({
    url:'pss/preScreenTaskDetail/modify',
    method:'put',
    data:data
  })
}
export function batchAddAppletData(data) {
  return request({
    url:'pss/appletData/1/200',
    method:'post',
    data:data
  })
}