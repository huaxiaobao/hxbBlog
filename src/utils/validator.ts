//校验信息

import exp from "constants"

/* 登录用户名校验 */
export function userNameValid(rule: any, value: any, callback: any) {
  const reg = /^[\w\u4e00-\u9fa5]{1,8}$/g.test(value)
  if (!reg) {
    return callback(new Error('请输入长度为1-8位的用户名！'))
  } else {
    return callback()
  }
}

//密码校验
export function passWordValid(rule: any, value: any, callback: any) {
  if (!value) return callback(new Error('请输入密码'))
  const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(value)
  if (!reg) {
    return callback(new Error('请输入由大小写字母和数字组成的 6-16位密码！'))
  } else {
    return callback()
  }
}

//修改密码
export function editPass(rule: any, value: any, callback: any, repassWord: any) {
  console
  if (!value) return callback(new Error('请填写密码！'))
  if (value === repassWord) return callback(new Error('新密码不能与原密码一致！'))
  const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(value)
  if (!reg) {
    return callback(new Error('请输入由大小写字母和数字组成的 6-16位密码！'))
  } else {
    return callback()
  }
}

//确认密码
export function ensurePass(rule: any, value: any, callback: any, passWord: any) {
  if (!value) return callback(new Error('请输入密码'))
  if (value !== passWord) {
    return callback(new Error('两次密码不一致'))
  } else {
    return callback()
  }
}