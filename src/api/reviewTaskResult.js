import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/reviewTaskResult/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}

export function saveTaskResult(data) {
  return request({
    url:'pss/reviewTaskResult/modify',
    method:'put',
    data:data
  })
}

export function getTaskResult(id) {
  return request({
    url:'pss/reviewTaskResult/'+id,
    method:'get',
  })
}
export function queryRadarChart(reTaskResultId) {
  return request({
    url:'pss/radarChart/queryRadarChart/'+reTaskResultId,
    method:'get',
  })
}