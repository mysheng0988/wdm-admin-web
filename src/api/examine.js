import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/preScreenTask/queryaudits/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertExamine(data) {
  return request({
    url:'pss/preScreenTaskDetail',
    method:'post',
    data:data
  })
}
export function updateExamine(data) {
  return request({
    url:'pss/preScreenTask/auditPreScreenTask',
    method:'put',
    data:data
  })
}
export function updateExamineStudent(data) {
  return request({
    url:'pss/preScreenTaskDetail/modify',
    method:'put',
    data:data
  })
}