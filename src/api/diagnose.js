import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/diagnosis/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
//查询孩子信息
export function reviewChildData(data) {
  return request({
    url:'/pss/diagnosis/reviewChild',
    method:'post',
    data:data
  })
}

export function updateDiagnosis(data) {
  return request({
    url:'/pss/diagnosis',
    method:'put',
    data:data
  })
}
export function insertDiagnosis(data) {
  return request({
    url:'/pss/diagnosis',
    method:'post',
    data:data
  })
}
export function cancelDiagnosis(data){
  return request({
    url:'/pss/diagnosis/cancelDiagnosis',
    method:'put',
    data:data
  })
}
