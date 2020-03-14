import Cookies from 'js-cookie'

const TokenKey = 'loginToken'
export function getToken() {
  // return Cookies.get(TokenKey)
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return sessionStorage.setItem(TokenKey,token)
}

export function removeToken() {
 // return Cookies.remove(TokenKey)
  return sessionStorage.setItem(TokenKey,"")
}

export function mergeTableRow(data, merge) {
  if (!merge || merge.length === 0) {
    return data
  }
  merge.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal] && mList[rowVal].newIndex === index) {
        mList[rowVal]['num']++
        mList[rowVal]['newIndex']++
        data[mList[rowVal]['index']][m + '-span'].rowspan++
        v[m + '-span'] = {
          rowspan: 0,
          colspan: 0
        }
      } else {
        mList[rowVal] = { num: 1, index: index, newIndex: index + 1 }
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}
