Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: 'visibleChange'
    }
  },
  data: {
    show: false,
    content: ''
  },
  methods: {
    /**
     * 显示状态改变
     */
    visibleChange (newVal) {
      this.setData({ show: newVal })
    },

    /**
     * 隐藏
     */
    hide () {
      this.setData({ visible: false })
    },

    /**
     * 输入事件
     */
    input (e) {
      this.setData({ content: e.detail.value.trim() })
    },

    /**
     * 发布点击
     */
    publish () {
      if (this.data.content) {
        this.triggerEvent('publish', { value: this.data.content })
      }
    }
  }
})