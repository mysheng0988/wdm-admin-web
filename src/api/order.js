import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'pss/order/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function queryOrder(id) {
  return request({
      url:'pss/order/queryOrder/'+id,
      method:'get',
  })
}