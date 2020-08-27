import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url:'pss/member/'+data.pageNum+'/'+data.pageSize,
        method:'post',
        data:data
    })
}



export function queryMember(memberNo) {
    return request({
        url:'pss/member/queryMember/'+memberNo,
        method:'get',
    })
}