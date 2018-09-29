export const wxbizdatacrypt = (data) => {
  // 解密 解密信息
  // data:
  //   iv -- 加密偏离量
  //   encrypted_data  -- 加密信息
  //   session_key -- 登录态
  //   success_callback   --  成功回调
  //   complete_callback  --  完成后的回调
  //   fail_callback    --  失败回调
  let { iv, encrypted_data, session_key, success_callback, complete_callback, fail_callback} = data

  wx.cloud.callFunction({
    name: 'wxbizdatacrypt',
    data: {
      iv: data.iv,
      encrypted_data: data.encrypted_data,
      session_key: data.session_key,
    },
    success: res => {
      console.log('结果: ', res)
      if ("function" === typeof (success_callback)) {
        success_callback(res);
      }

    },
    complete: info => {
      console.log('调用 wxbizdatacrypt 通用返回')
      if ("function" === typeof (complete_callback)) {
        complete_callback(info);
      }
    },
    fail: err => {
      console.log('调用 wxbizdatacrypt 失败： ', err)
      if ("function" === typeof (fail_callback)) {
        fail_callback(err);
      }
    }
  })
}