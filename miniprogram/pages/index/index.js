//index.js
import { wxbizdatacrypt } from '../../lib/common'
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUse: false,
  },

  onShow: function () {
    console.log("index 页面 show");
    this.setData({
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    })
  },
  onHide: function () {
    console.log("index 页面 hide");
  },

  onLoad: function() {
    if (globalData.session_key) {
      console.log("存在 session_key: " + globalData.session_key)
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效（未过期）
        success: function () {
          // 业务逻辑处理
          console.log('session_key 有效（未过期）请执行业务逻辑')
        },
        // session_key 过期
        fail: function () {
          // session_key 过期，重新登录
          console.log('session_key 过期，重新登录')
          this.wxLogin();
        }
      });
    }else {
      // 无 session_key，作为首次登录
      console.log('无 session_key，作为首次登录')
      this.wxLogin();
    }


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  wxLogin: function(){
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('res.code: ' + res.code)

          wx.cloud.callFunction({
            name: 'jscode2session',
            data: {
              code: res.code
            },
            success: res => {
              console.log('结果: ', res)
              let { openid = '', session_key = '' } = res.result || {}
              wx.setStorage({
                key: 'openid',
                data: openid,
              })
              wx.setStorage({
                key: 'session_key',
                data: session_key,
              })
            },
            complete: info => {
              console.log('调用 jscode2session 通用返回')
            },
            fail: err => {
              console.log('调用 jscode2session 失败： ', err)
            }
          })
        }
      }
    })
  },

  openSetting: function(){
    wx.openSetting({
      success: (res) => {
        console.log(res)
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      wxbizdatacrypt({
        iv: e.detail.iv,
        encrypted_data: e.detail.encryptedData,
        session_key: globalData.session_key,
        success_callback: function(res){
          console.log("res data")
          console.log(res)
        },
      })

    }
  },
  onGetPhoneNumber: function(e){
    console.log(e);
    wxbizdatacrypt({
      iv: e.detail.iv,
      encrypted_data: e.detail.encryptedData,
      session_key: globalData.session_key,
      success_callback: function (res) {
        console.log("res data")
        console.log(res)
      },
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
