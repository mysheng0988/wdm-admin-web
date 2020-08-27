import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url:'pss/preScreenTaskDetail/reviewInvit/'+data.pageNum+'/'+data.pageSize,
        method:'post',
        data:data
    })
}
export function getWorkTimes(data) {
    return request({
      url:'pss/preScreenTaskDetail/workTimesNum',
      method:'post',
      data:data
    })
  }
  
  export function getStudents(data) {
    return request({
      url:'pss/preScreenTaskDetail/students',
      method:'post',
      data:data
    })
  }

  export function insertInvite(data){
    return request({
        url:'pss/preScreenTaskDetail/appoint',
        method:'put',
        data:data
      })
  }
  export function updateInvite(data){
    return request({
        url:'pss/preScreenTaskDetail/appointModify',
        method:'put',
        data:data
      })
  }
  export function cancelInvite(data){
      return request({
          url:"pss/preScreenTaskDetail/appointCancel",
          method:"put",
          data:data
      })
  }


export function getTaskDetail(id){
    return request({
        url:"pss/preScreenTaskDetail/queryById/"+id,
        method:"get",
    })
}