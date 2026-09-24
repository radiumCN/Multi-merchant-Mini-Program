import {
  getServices, getMerchants, getMerchant, getService, addToCart, cartCount
} from '../../data/mock'
import { toast } from '../../utils/util'

const app = getApp<IAppOption>()

Page({
  data: {
    merchantName: '',
    tabs: ['全部门店', '本店', '保洁', '家电', '维修', '治理'],
    activeTab: 0,
    list: [] as ReturnType<typeof getServices>,
    cartCount: 0
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const mid = app.globalData.merchantId
    const m = getMerchant(mid)
    this.setData({
      merchantName: m ? m.name : '',
      cartCount: cartCount()
    })
    this.filter()
  },

  filter() {
    const tab = this.data.activeTab
    const mid = app.globalData.merchantId
    let list = getServices()
    if (tab === 1) list = getServices(mid)
    else if (tab === 2) list = list.filter(s => s.categoryId === 'c2' || s.categoryId === 'c3')
    else if (tab === 3) list = list.filter(s => s.categoryId === 'c1')
    else if (tab === 4) list = list.filter(s => s.categoryId === 'c4' || s.categoryId === 'c5')
    else if (tab === 5) list = list.filter(s => s.categoryId === 'c6' || s.categoryId === 'c7' || s.categoryId === 'c8')
    this.setData({ list })
  },

  onTab(e: WechatMiniprogram.TouchEvent) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.i) })
    this.filter()
  },

  onQty(e: WechatMiniprogram.TouchEvent) {
    const detail = e.detail as { id: string; delta: number }
    const id = detail && detail.id
    const delta = detail && detail.delta
    if (!id || !delta) return
    const svc = getService(id)
    if (!svc) return
    if (delta > 0) {
      addToCart(id, 1)
      toast('已加入购物车')
    }
    this.setData({ cartCount: cartCount() })
  },

  onService(e: WechatMiniprogram.CustomEvent) {
    const id = (e.detail && e.detail.id) as string
    if (!id) return
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  goCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  }
})
