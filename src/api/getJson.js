import request from '@/utils/request'
export function getScaleJson(data) {
  return request({
    url:'../static/scale/scaleJson'+data+".json",
    method:'get',
  })
}

