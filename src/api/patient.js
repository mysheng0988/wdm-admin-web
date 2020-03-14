import request from '@/utils/request'
export function queryPatient(data) {
  return request({
    url:'base/patient/list/'+data.pageNum+"/"+data.pageSize,
    method:'post',
    data:data
  })
}
export function queryExamination(deptId) {
  return request({
    url:'ips/examination/list/deptId/'+deptId,
    method:'get',
  })
}
export function savePatient(data) {
  return request({
    url:'base/patient',
    method:'post',
    data:data
  })
}
export function getPatient(id) {
  return request({
    url:'base/patient/info/id/'+id,
    method:'get',
  })
}
export function updatePatient(data) {
  return request({
    url:'base/patient/',
    method:'put',
    data:data
  })
}
//下拉查询科室
export function getDeptList(hospitalId) {
  return request({
    url:'base/dept/list/hospitalId/'+hospitalId,
    method:'get',
  })
}
//评测记录
export function getMedicalRecord(data) {
  return request({
    url:'base/medicalRecord/list/'+data.pageNum+"/"+data.pageSize,
    method:'post',
    data:data
  })
}
//查看报告
export function medicalReadRecord(id) {
  return request({
    url:'base/medicalRecord/id/'+id,
    method:'get',
  })
}
//根据身份证号查询
export function getInfoCard(id) {
  return request({
    url:'base/patient/info/cardNo/'+id,
    method:'get',
  })
}
//查询名族和学历
export function getNationEdu() {
  return request({
    url:'base/Dictionary/edu/list/1/200',
    method:'get',
  })
}
export function getDoctorList(data) {
  return request({
    url:'base/user/list/deptId/'+data.deptId+'?sid='+data.sid,
    method:'get',
  })
}
export function saveMedicalRecord(data) {
  return request({
    url:'base/medicalRecord',
    method:'post',
    data:data,
  })
}
export function updateMedicalRecord(data) {
  return request({
    url:'base/medicalRecord',
    method:'put',
    data:data,
  })
}
export function getMedicalRecordPatient(param) {
  return request({
    url:'base/medicalRecord/patientId/'+param,
    method:'get'
  })
}
