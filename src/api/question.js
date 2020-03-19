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
export function getQuestionnaire(params) {
  return request({
    url:'ips/questionnaire/echo',
    method:'get',
    params:params,
  })
}
export function additionalQuestions(medicalRecordId) {
  return request({
    url:'ips/scale/additionalQuestions/'+medicalRecordId,
    method:'get',
  })
}
export function submitAdditionalQuestions(data) {
  return request({
    url:'ips/scale/additionalQuestions/'+data.medicalRecordId+"?answers="+data.answers[0]+"&answers="+data.answers[1]+"&answers="+data.answers[2]+"&answers="+data.answers[3],
    method:'post',
  })
}