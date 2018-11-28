Page({

  /**
   * 页面的初始数据
   */
  data: {
    db_name: '',
    search_value: '',
    data_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("----- pages/data_select/list/list.js ------")
    // console.log(options)
    if (options.hasOwnProperty('db_name')){
      this.setData({
        db_name: options.db_name
      })
    }
    // console.log("----- pages/data_select/list/list.js ------")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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