import request from '@/utils/request'
export function queryHospital(matchingString) {
    return request({
      url:"base/organization/list/fuzzyMatching?matchingString="+matchingString+"&serviceId=5000",
      method:'get',
    })
  }
export function queryHospitalDept(hospitalId) {
    return request({
      url:"base/dept/list/organizationId/"+hospitalId,
      method:'get',
    })
  }


  export function queryDeptDorter(deptId) {
    return request({
      url:"base/user/list/deptId/"+deptId,
      method:'get',
    })
  }
  