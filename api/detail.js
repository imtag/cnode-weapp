const Http = require('../utils/http.js')

/**
 * 获取文章详情
 * @param {string} id 文章id
 */
module.exports.getTopicDetail = id => {
  return new Promise((resolve, reject) => {
    Http.get({ 
      url: '/topic/' + id,
      params: {
        mdrender: false
      }
    }).then(res => {
      if (res.success) {
        resolve(res.data)
      }
      reject(res)
    }).catch(reject)
  })
}