Component({

  properties: {

  },

  data: {
    formIdList: []
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("组件退出")
    const that = this
    wx.getStorage({
      key: 'formIdList',
      success: function(res) {
        wx.setStorage({
          key: 'formIdList',
          data: res.data.concat(that.data.formIdList),
        })
      },
      fail: function(err) {
        wx.setStorage({
          key: 'formIdList',
          data: that.data.formIdList,
        })
      }
    })
  },

  methods: {
    getFormId: function(e) {
      // console.log(e.detail.formId)
      const formId = e.detail.formId
      this.data.formIdList.push(e.detail.formId)

    }
  }
})