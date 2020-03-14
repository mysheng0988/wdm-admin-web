import request from '@/utils/request'
export function submitQuestion(params) {
  return request({
    url:'ips/questionnaire/submit',
    method:'post',
    data:params
  })
}

export function submitSacleQuestion(params) {
  return request({
    url:'ips/scale/submit',
    method:'post',
    data:params
  })
}
export function getMedicalRecord(params) {
  return request({
    url:'base/medicalRecord/'+params,
    method:'get',
  })
}
