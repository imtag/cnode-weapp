const Http = require('../utils/http.js')

/**
 * 获取首页主题
 * @param {object} params 请求参数
 */
module.exports.getTopics = params => {
  return new Promise((resolve, reject) => {
    Http.get({ 
      url: '/topics',
      params
    }).then(res => {
      if (res.success) {
        resolve(res.data)
      }
      reject(res)
    }).catch(reject)
  })
}