import request from '@/utils/request'
export function medicalRecordList(data) {
  return request({
    url:'base/medicalRecord/list/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function updateMedicalRecord(data) {
  return request({
    url:'base/medicalRecord',
    method:'put',
    data:data,
  })
}
