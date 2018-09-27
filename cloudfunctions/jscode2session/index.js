// 云函数名称：jscode2session
const API_URL = 'https://api.weixin.qq.com/sns/jscode2session'
const request = require('request')
const querystring = require('querystring')


exports.main = async (event) => {
  let { code } = event
  const data = {
    appid: 'wx77ddd85d04814b4a',
    secret: '3dce56bc6176d628a90321d0a81d133b',
    js_code: code,
    grant_type: 'authorization_code'
  }
  let url = API_URL + '?' + querystring.stringify(data)
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          const r = JSON.parse(body)
          resolve(r)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}