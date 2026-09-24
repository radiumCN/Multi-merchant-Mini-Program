Component({
  properties: {
    service: {
      type: Object,
      value: {}
    },
    qty: {
      type: Number,
      value: 0
    },
    showStepper: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onTap() {
      const id = this.data.service && this.data.service.id
      if (!id) return
      // 组件内直接跳转，少一层事件中转，点击即进页
      wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
      this.triggerEvent('open', { id })
    },
    onPlus() {
      this.triggerEvent('qty', { id: this.data.service.id, delta: 1 })
    }
  }
})
