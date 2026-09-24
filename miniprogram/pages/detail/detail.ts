import { getService, getMerchant, getCategory, addToCart } from '../../data/mock'
import { toast } from '../../utils/util'

Page({
  data: {
    service: {} as ReturnType<typeof getService>,
    merchant: {} as ReturnType<typeof getMerchant>,
    categoryName: ''
  },

  onLoad(query: Record<string, string | undefined>) {
    const id = query.id || ''
    const service = getService(id)
    if (!service) {
      toast('服务不存在')
      setTimeout(() => wx.navigateBack(), 800)
      return
    }
    const merchant = getMerchant(service.merchantId)
    const cat = getCategory(service.categoryId)
    this.setData({
      service,
      merchant,
      categoryName: cat ? cat.name : ''
    })
    wx.setNavigationBarTitle({ title: service.name })
  },

  addCart() {
    const s = this.data.service
    if (!s || !s.id) return
    addToCart(s.id, 1)
    toast('已加入购物车')
  },

  bookNow() {
    const s = this.data.service
    if (!s || !s.id) return
    addToCart(s.id, 1)
    wx.navigateTo({ url: '/pages/order-confirm/order-confirm?ids=' + s.id })
  },

  goMerchant() {
    const m = this.data.merchant
    if (!m || !m.id) return
    wx.navigateTo({ url: '/pages/merchant/merchant?id=' + m.id })
  },

  goDesc() {
    wx.navigateTo({ url: '/pages/notice/notice?type=desc' })
  },

  goGuarantee() {
    wx.navigateTo({ url: '/pages/notice/notice?type=guarantee' })
  },

  callPhone() {
    const m = this.data.merchant
    if (m && m.phone) wx.makePhoneCall({ phoneNumber: m.phone })
  },

  /** 唤起地图导航 */
  openMap() {
    const m = this.data.merchant
    if (!m) return
    wx.openLocation({
      latitude: m.latitude,
      longitude: m.longitude,
      name: m.name,
      address: m.address,
      scale: 16
    })
  }
})
