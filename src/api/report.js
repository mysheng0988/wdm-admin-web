import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/preScreenTaskDetail/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function getReportData(id) {
  return request({
    url:'pss/preScreenTaskDetail/queryById/'+id,
    method:'get'
  })
}