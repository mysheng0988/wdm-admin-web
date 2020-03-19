import request from '@/utils/request'
export function analysisData(params) {
  return request({
    url:'ips/report/medicalRecordId/'+params.medicalRecordId+"/"+params.source,
    method:'get',
    params:params
  })
}
export function updataData(data) {
  return request({
    url:'ips/report',
    method:'put',
    data:data
  })
}
export function saveContraindications(data) {
  return request({
    url:'ips/report/filter/contraindications/'+data.medicalRecordId,
    method:'post',
    data:data
  })
}