Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number(e.currentTarget.dataset.i)
      if (index === this.data.active) return
      this.triggerEvent('change', { index })
    }
  }
})
