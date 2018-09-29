//app.js
App({
  globalData: {
    openid: wx.getStorageSync('openid'),
    session_key: wx.getStorageSync('session_key'),
  },
  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init()
    }
  }
})
