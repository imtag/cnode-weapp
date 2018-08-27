Component({
  properties: {
    // loading加载中、nomore没有更多、error网络错误
    type: {
      type: String,
      value: 'loading'
    }
  },
  methods: {
    retry () {
      this.triggerEvent('retry')
    }
  }
})