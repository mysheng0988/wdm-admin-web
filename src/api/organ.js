import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pss/organ/queryOrgans/'+data.pageNum+'/'+data.pageSize,
    method:'post',
    data:data
  })
}
export function insertOrgan(data) {
  return request({
    url:'/pss/organ',
    method:'post',
    data:data
  })
}

export function updateOrgan(data) {
  return request({
    url:'/pss/organ/modify',
    method:'put',
    data:data
  })
}

export function getOrganList(data) {
  return request({
    url:'/pss/organ/queryOrgans',
    method:'post',
    data:data
  })
}

export function getOrganLeveList(data){
  return request({
    url:'/pss/organ/queryOrganInfos',
    method:'post',
    data:data
  })
}
