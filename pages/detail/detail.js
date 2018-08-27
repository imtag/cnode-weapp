const WxParse = require('../../libs/wxParse/wxParse.js')
const { getTopicDetail } = require('../../api/detail.js')

Page({
  data: {
    detailData: '',
    tipType: 'loading',
    id: '',
    commentVisible: false
  },

  onLoad (query) {
    this.setData({ id: query.id }, () => {
      this.initLoad()
    })
  },

  /**
   * 显示评论
   */
  showComment () {
    this.setData({ commentVisible: true })
  },

  /**
   * 发布评论
   */
  publishComment (e) {
    const value = e.detail.value
    console.log(value)
  },

  /**
   * 重试初始化加载
   */
  retryInitLoad () {
    this.setData({ tipType: 'loading' }, () => {
      this.initLoad()
    })
  },

  /**
   * 初始化加载
   */
  initLoad () {
    getTopicDetail(this.data.id).then(res => {
      // 解析文档
      WxParse.wxParse('articleDetail', 'md', res.content, this, 5)
      // 设置数据
      this.setData({
        detailData: res
      })
    }).catch(err => {
      this.setData({ tipType: 'error' })
    })
  }
})
