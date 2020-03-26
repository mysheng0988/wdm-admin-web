import request from '@/utils/request'
export function questionnaireResult(medicalRecordId) {
  return request({
    url:'ips/questionnaire/assess/'+medicalRecordId,
    method:'get',
  })
}
export function scaleResult(medicalRecordId) {
  return request({
    url:'ips/scale/result/'+medicalRecordId,
    method:'get',
  })
}
export function getReportMsg(medicalRecordId) {
  return request({
    url:'ips/report/medicalRecordId/'+medicalRecordId,
    method:'get',
  })
}
export function getReportList(param) {
  return request({
    url:'ips/report/medicalRecordId/'+medicalRecordId,
    method:'get',
  })
}