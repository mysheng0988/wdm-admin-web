import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'base/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: 'base/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: 'base/logout',
    method: 'get'
  })
}

