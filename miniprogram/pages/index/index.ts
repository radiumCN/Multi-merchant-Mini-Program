import {
  getMerchants, getCategories, getServices, getMerchant,
  setCurrentMerchant, cartCount
} from '../../data/mock'

const app = getApp<IAppOption>()

Page({
  data: {
    merchant: {} as ReturnType<typeof getMerchant>,
    banners: [] as { id: string; title: string; sub: string; theme: string; art: string; image?: string }[],
    quick: [] as ReturnType<typeof getCategories>,
    hotServices: [] as ReturnType<typeof getServices>,
    merchantList: [] as ReturnType<typeof getMerchants>,
    cartCount: 0,
    statusBarHeight: 20,
    navTotal: 64
  },

  onLoad() {
    const info = wx.getWindowInfo
      ? wx.getWindowInfo()
      : (wx.getSystemInfoSync() as WechatMiniprogram.SystemInfo)
    const statusBarHeight = info.statusBarHeight || 20
    // 44px 导航内容高度 + 状态栏
    this.setData({
      statusBarHeight,
      navTotal: statusBarHeight + 44
    })
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const mid = app.globalData.merchantId || 'm1'
    const merchant = getMerchant(mid)
    const cats = getCategories().slice(0, 8)
    const hot = getServices(mid).filter(s => s.hot).slice(0, 4)
    const list = getMerchants().slice(0, 3)
    this.setData({
      merchant,
      banners: [
        {
          id: 'b1',
          title: '家电清洗',
          sub: '空调 | 油烟机 | 洗衣机 | 冰箱 | 热水器',
          theme: 'ph-green',
          art: '洗'
        },
        {
          id: 'b2',
          title: '全屋深度保洁',
          sub: '厨卫重点 · 高温除菌 · 上门服务',
          theme: 'ph-teal',
          art: '洁'
        }
      ],
      quick: cats,
      hotServices: hot.length ? hot : getServices(mid).slice(0, 4),
      merchantList: list,
      cartCount: cartCount()
    })
  },

  onSearch() {
    wx.navigateTo({ url: '/pages/category/category?focus=1' })
  },

  onPickMerchant() {
    wx.navigateTo({ url: '/pages/merchants/merchants' })
  },

  onMerchantTap(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    setCurrentMerchant(id)
    app.globalData.merchantId = id
    this.refresh()
    wx.navigateTo({ url: '/pages/merchant/merchant?id=' + id })
  },

  onCategoryTap(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    wx.navigateTo({ url: '/pages/category/category?cid=' + id })
  },

  onServiceTap(e: WechatMiniprogram.CustomEvent) {
    const id = (e.detail && e.detail.id) as string
    if (!id) return
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  goCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  onBannerService() {
    wx.showActionSheet({
      itemList: ['微信客服会话', '拨打电话 4008313888'],
      success: (res) => {
        if (res.tapIndex === 1) {
          wx.makePhoneCall({ phoneNumber: '4008313888' })
        }
      }
    })
  },

  callHotline() {
    wx.makePhoneCall({ phoneNumber: '4008313888' })
  },

  callHotline() {
    wx.makePhoneCall({ phoneNumber: '4008313888' })
  },

  callHotline() {
    wx.makePhoneCall({ phoneNumber: '4008313888' })
  },

  goAllServices() {
    wx.navigateTo({ url: '/pages/service/service' })
  },

  callPhone() {
    const m = this.data.merchant
    if (!m || !m.phone) return
    wx.makePhoneCall({ phoneNumber: m.phone })
  }
})
