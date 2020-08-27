import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/monitorCenter/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function monitorCenterList() {
    return request({
      url:'pss/monitorCenter/queryMonitorCenters',
      method:'post',
      data:{}
    })
  }

  export function insertMonitor(data) {
    return request({
      url:'pss/monitorCenter',
      method:'post',
      data:data
    })
  }
  
  export function updateMonitor(data) {
    return request({
      url:'pss/monitorCenter/modify',
      method:'put',
      data:data
    })
  }

  export function queryHospital(matchingString) {
    return request({
      url:"base/organization/list/fuzzyMatching?matchingString="+matchingString+"&serviceId="+[5000],
      method:'get',
    })
  }