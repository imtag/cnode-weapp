const { getTopics } = require('../../api/home.js')
const limit = 20

Page({
  data: {
    tab: '',
    page: 1,
    articles: [],
    loadmoreType: 'loading',
    tipType: 'loading'
  },

  onLoad () {
    this.initLoad()
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
   * 文章点击事件
   */
  articleClick (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 作者点击事件
   */
  userClick (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '../user/user?id=' + id
    })
  },

  /**
   * 初始化加载
   */
  initLoad (isRefresh = false) {
    this.requestArticles().then(res => {
      if (isRefresh) {
        wx.stopPullDownRefresh()
      }
      // 无数据
      if (!res.length) {
        this.setData({ tipType: 'nodata' })
        return
      }

      // 无更多
      if (res.length < limit) {
        this.setData({
          articles: res,
          loadmoreType: 'nomore'
        })
        return
      }

      // 有数据
      this.setData({ articles: res })
    }).catch(() => {
      // 请求失败
      if (isRefresh) {
        wx.stopPullDownRefresh()
        wx.showToast({
          icon: 'none',
          title: '网络错误，更新失败'
        })
        return
      }
      this.setData({ tipType: 'error' })
    })
  },

  /**
   * 请求首页文章列表
   */
  requestArticles () {
    const params = {
      tab: this.data.tab,
      page: this.data.page,
      limit: limit,
      mdrender: false
    }
    return getTopics(params)
  },
  
  /**
   * 下拉刷新回调
   */
  onPullDownRefresh () {
    this.setData({ page: 1 }, () => {
      this.initLoad(true)
    })
  },

  /**
   * 上拉触底回调
   */
  onReachBottom () {
    this.loadmore()
  },
  
  /**
   * 加载更多
   */
  loadmore () {
    // 正在加载或无更多
    if (this.loadingMore || this.data.loadmoreType === 'nomore') {
      return
    }
  
    // 请求下一页
    this.loadingMore = true
    this.setData(
      { 
        page: this.data.page + 1, 
        loadmoreType: 'loading'
      },
      () => {
        this.requestArticles().then(res => {
          this.loadingMore = false
          // 没有数据
          if (!res.length) {
            this.setData({ loadmoreType: 'nomore' })
            return
          }
    
          // 有数据，无更多
          if (res.length < limit) {
            this.setData({
              articles: this.data.articles.concat(res),
              loadmoreType: 'nomore'
            })
            return
          }
          
          // 有更多
          this.setData({
            articles: this.data.articles.concat(res),
            loadmoreType: 'loading'
          })
        }).catch((err) => {
          this.loadingMore = false
          // 请求失败，
          this.setData({ 
            page: this.data.page - 1,
            loadmoreType: 'error'
          })
        })
      }
    )
  }
})
