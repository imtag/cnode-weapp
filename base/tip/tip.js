Component({
  properties: {
    // loading加载中、error网络错误、nodata无数据
    type: {
      type: String,
      value: 'loading'
    },
    desc: String
  },
  methods: {
    retry () {
      this.triggerEvent('retry')
    }
  }
})