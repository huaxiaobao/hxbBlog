/*
 * @Author: hxb 
 * @Date: 2022-07-22 14:18:29 
 * @Last Modified by:   hxb 
 * @Last Modified time: 2022-07-22 14:18:29 
 */

// import Cookies from 'js-c'
// //保存 token
// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

//保存本次寸尺
export function getLocalStore() {
  return localStorage.getItem('userInfo')
}

export function setLocalStore(data: any) {
  return localStorage.setItem('userInfo', JSON.stringify(data))
}

// export function removeLocalStore() {
//   return Cookies.remove(TokenKey)
// }