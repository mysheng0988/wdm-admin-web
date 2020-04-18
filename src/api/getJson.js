import request from '@/utils/request'
export function getScaleJson(data) {
  return request({
    url:'../static/scale/scale'+data+".json",
    method:'get',
  })
}
export function getQuestionJson(data) {
  return request({
    url:'../static/scale/scaleJson'+data+".json",
    method:'get',
  })
}

export function getScaleTypeJson() {
  return request({
    url:'../static/scale/scaleType.json',
    method:'get',
  })
}

