import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/student/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertStudent(data) {
  return request({
    url:'/pss/student/',
    method:'post',
    data:data
  })
}

export function updateStudent(data) {
  return request({
    url:'/pss/student/',
    method:'put',
    data:data
  })
}
