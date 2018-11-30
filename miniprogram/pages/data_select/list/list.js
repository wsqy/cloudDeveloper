Page({

  /**
   * 页面的初始数据
   */
  data: {
    db_name: '',
    search_value: '',
    result_type: '结果类型',
    result_list: [],
    skip: 0,
    limit: 20
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
      this.refreshResultList();
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
    console.log("------开始下拉-----------")
    this.refreshResultList()
    console.log("------结束下拉-----------")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("------开始上拉加载-----------")
    this.reachResultList()
    console.log("------结束上拉加载-----------")
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
    // todo 缺搜索词的设置
    this.refreshResultList();
  },

  fetchResultList: function (param) {
    const that = this
    that.setData({
      result_type: '查询结果'
    })
    const db = wx.cloud.database()

    const _ = db.command
    const search_value = that.data.search_value

    db.collection(that.data.db_name)
      .where(_.or([
          {
            //使用正则查询，实现对搜索的模糊查询
            flag2: db.RegExp({
              regexp: search_value,
              //从搜索栏中获取的value作为规则进行匹配。
              options: 'i',
              //大小写不区分
            })
          },
          {
            //使用正则查询，实现对搜索的模糊查询
            passenger_id_no: db.RegExp({
              regexp: search_value,
              //从搜索栏中获取的value作为规则进行匹配。
              options: 'i',
              //大小写不区分
            })
          },
        {
          //使用正则查询，实现对搜索的模糊查询
          passenger_name: db.RegExp({
            regexp: search_value,
            //从搜索栏中获取的value作为规则进行匹配。
            options: 'i',
            //大小写不区分
          })
        },
      ]))
      .orderBy('start_date', 'desc')
      .skip(this.data.skip)
      .limit(this.data.limit)
      .get({
      success: function (res) {
        console.log('----获取数据成功----')
        console.log(res)
        that.setData({
          skip: that.data.skip + res.data.length
        })
        if(param.hasOwnProperty('success')){
          param.success(res)
        }
        console.log('----获取数据成功----')
      },
      complete: function (res){
        console.log('----获取数据完成----')
        console.log('----获取数据完成----')
      }
    })
  },

  refreshResultList: function(){
    const that = this
    that.data.skip = 0
    that.fetchResultList({
      success: function(res){
        that.setData({
          result_list: res.data,
        })
      }
    })
  },

  reachResultList: function () {
    const that = this
    that.fetchResultList({
      success: function (res) {
        that.setData({
          result_list: result_list.push.apply(result_list, res.data)
        })
      }
    })
  },

})