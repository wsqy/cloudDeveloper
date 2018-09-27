//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init()
    }
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log("openid： " + res.data)
      },
    })
    wx.getStorage({
      key: 'session_key',
      success: function (res) {
        console.log("session_key " + res.data)
      },
    })

    this.globalData = {}
  }
})
