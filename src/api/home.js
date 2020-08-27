import request from '@/utils/request'

export function countClassesResult(data) {
  return request({
    url: 'pss/preScreenTaskDetail/countClassesResult',
    method: 'post',
    data: data,
  })
}


export function countResults(data) {
  return request({
    url: 'pss/preScreenTaskDetail/countResults',
    method: 'post',
    data: data,
  })
}


export function countScoliosis(data) {
  return request({
    url: 'pss/preScreenTaskDetail/countScoliosis',
    method: 'post',
    data: data,
  })
}
export function countSexResult(data) {
  return request({
    url: 'pss/preScreenTaskDetail/countSexResult',
    method: 'post',
    data: data,
  })
}