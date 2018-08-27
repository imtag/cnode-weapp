const config = require('../config/index.js')

/**
 * http请求封装
 * @param {object} options 
 */
const Http = options => {
  return new Promise((resolve, reject) => {
    const baseUrl = options.baseUrl ? options.baseUrl : config.dev.baseUrl
    const header = options.header ? options.header : { 'content-type': 'application/json' }
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      header,
      method: options.method,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * get请求（拼接url参数）
 * @param {object} options 请求配置
 */
Http.get = options => {
  // object转queryString
  const isObj = Object.prototype.toString.call(options.params) === '[object Object]'
  if (isObj) {
    let queryString = ''
    for (let key in options.params) {
      queryString += '&' + key + '=' + options.params[key]
    }
    options.url += '?' + queryString.slice(1)
  }

  return Http(Object.assign({
    method: 'GET'
  }, options))
}

/**
 * post请求
 * @param {string} options 请求配置
 */
Http.post = options => {
  return Http(Object.assign({
    method: 'POST'
  }, options))
}

module.exports = Http