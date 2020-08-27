import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/reviewTask/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}

export function changeTaskState(data) {
  return request({
    url:'pss/reviewTask',
    method:'put',
    data:data
  })
}
export function startReview(data) {
  return request({
    url:'pss/reviewTask/startReview',
    method:'put',
    data:data
  })
}

export function getByStudentCardId(data) {
  return request({
    url:'pss/student/queryReviewStudents/'+data,
    method:'get',
  })
}
export function save365ReTask(data) {
  return request({
    url:'pss/reviewTask',
    method:'post',
    data:data
  })
}


