Component({
  properties: {
    phone: {
      type: String,
      value: '4008313888'
    },
    navOffset: {
      type: Number,
      value: 0
    }
  },

  data: {
    left: 0,
    top: 0,
    size: 72,
    ready: false,
    dragging: false
  },

  lifetimes: {
    attached() {
      this.measure()
      this.setData({
        left: this.winW - this.data.size - 16,
        top: this.maxTop(),
        ready: true
      })
    }
  },

  methods: {
    measure() {
      const info = wx.getWindowInfo
        ? wx.getWindowInfo()
        : (wx.getSystemInfoSync() as WechatMiniprogram.SystemInfo)
      this.winW = info.windowWidth
      this.winH = info.windowHeight
      this.safeBottom = info.screenHeight && info.safeArea
        ? Math.max(0, info.screenHeight - info.safeArea.bottom)
        : 0
    },

    minTop() {
      return Math.max(0, this.data.navOffset || 0)
    },

    maxTop() {
      const size = this.data.size
      return Math.max(this.minTop(), this.winH - size - 50 - this.safeBottom - 8)
    },

    onTouchStart(e: WechatMiniprogram.TouchEvent) {
      const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0])
      if (!t) return
      this._sx = t.clientX
      this._sy = t.clientY
      this._ox = this.data.left
      this._oy = this.data.top
      this._moved = false
    },

    onTouchMove(e: WechatMiniprogram.TouchEvent) {
      const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0])
      if (!t) return
      const dx = t.clientX - this._sx
      const dy = t.clientY - this._sy
      if (!this._moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
        this._moved = true
        this.setData({ dragging: true })
      }
      if (!this._moved) return

      const size = this.data.size
      const left = Math.min(Math.max(8, this._ox + dx), this.winW - size - 8)
      const top = Math.min(Math.max(this.minTop(), this._oy + dy), this.maxTop())
      this.setData({ left, top })
    },

    onTouchEnd() {
      this.setData({ dragging: false })
      const { left, size } = this.data
      const gap = 12
      const toRight = left + size / 2 >= this.winW / 2
      this.setData({ left: toRight ? this.winW - size - gap : gap })
      this._moved = false
    }
  }
})
