import { loginOut } from './../api/login';
import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { login, loginOut } from '@/api/login'
export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      username: '',
      id: '',
      avatar: ''
    }
  },
  getters: {},
  actions: {
    /* 用户登录 */
    loginUser(userInfo: object): Promise {
      return new Promise((reslove, reject) => {
        login(userInfo).then(res => {
          if (res.code === 201) {
            //账户密码不正确
            ElNotification({
              title: '提示',
              type: 'warning',
              message: res.Msg,
              position: 'bottom-right'
            })
            reslove(res)
          } else if (res.code === 405) {
            reslove(res)
          } else {
            //登录成功
            this.SET_USERINFO(res.data)
            this.SET_LOCALSTORE(res.data)
            reslove(res)
          }
        }).catch(res => {
          reject(res)
        })
      })
    },

    //保存用户信息
    SET_USERINFO(userInfo: object) {
      this.username = userInfo.username
      this.id = userInfo.id
      this.avatar = userInfo.avatar
    },

    //清除
    REMOVE_USERINFO() {
      this.username = ''
      this.id = ''
      this.avatar = ''
    },

    /* 本地存储 保存用户登录信息 */
    SET_LOCALSTORE(userInfo: object) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },


    //退出登录
    loginDispatch(): Promise {
      return new Promise((reslove, reject) => {
        loginOut()
          .then((res: any) => {
            if (res.code === 803) {
              this.REMOVE_USERINFO()
              reslove(res.code)
            }
          })
          .catch(() => {
            reject()
          })
      })

    }


  }
})