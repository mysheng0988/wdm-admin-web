import request from '@/utils/request'
export function getHRV(data) {
  return request({
    url:'ips/hrv/medicalRecordId/'+data,
    method:'get',
  })
}

