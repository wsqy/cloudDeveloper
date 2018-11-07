// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },

  onLoad: function (options) {
    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  },
  // 上传图片
  doUpload: function () {
    const that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log("------ res -----")
        console.log(res)
        console.log("------ res -----")

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        console.log("------ filePath -----")
        console.log(filePath)
        console.log("------ filePath -----")

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        console.log("------ cloudPath -----")
        console.log(cloudPath)
        console.log("------ cloudPath -----")

        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.setData({
              fileID: res.fileID,
              cloudPath: cloudPath,
              imagePath: filePath,
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
  submitData: function(e){
    console.log('form发生了submit事件，携带数据为：')
    console.log(e.detail)
    wx.showToast({
      icon: 'none',
      title: e.detail.formId,
    })
    console.log('form发生了submit事件，携带数据为：')
  }
})