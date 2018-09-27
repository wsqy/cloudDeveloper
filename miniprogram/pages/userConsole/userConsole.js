// pages/userConsole/userConsole.js
Page({

  data: {
    openid: ''
  },

  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log("userConsole 页面显示");
  },
})
