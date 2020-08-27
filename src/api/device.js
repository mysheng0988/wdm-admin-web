import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/equipment/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertEquipment(data) {
  return request({
    url:'pss/equipment',
    method:'post',
    data:data
  })
}
export function updateEquipment(data) {
  return request({
    url:'pss/equipment',
    method:'put',
    data:data
  })
}
