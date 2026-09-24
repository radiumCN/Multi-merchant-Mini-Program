import {
  getCart, setCartQty, cartTotal, getMerchant, getService, createOrders, clearCart
} from '../../data/mock'
import { toast } from '../../utils/util'

Page({
  data: {
    groups: [] as {
      merchantId: string
      merchantName: string
      theme: string
      items: { serviceId: string; name: string; price: number; qty: number }[]
      sum: number
    }[],
    total: 0,
    isEmpty: true
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const cart = getCart()
    const map = new Map<string, { serviceId: string; name: string; price: number; qty: number }[]>()
    cart.forEach(item => {
      const svc = getService(item.serviceId)
      const mid = svc ? svc.merchantId : 'm1'
      if (!map.has(mid)) map.set(mid, [])
      map.get(mid)!.push(item)
    })
    const groups = [...map.entries()].map(([merchantId, items]) => {
      const m = getMerchant(merchantId)
      return {
        merchantId,
        merchantName: m ? m.name : merchantId,
        theme: m ? m.theme : 'ph-green',
        items,
        sum: items.reduce((s, i) => s + i.price * i.qty, 0)
      }
    })
    this.setData({
      groups,
      total: cartTotal(),
      isEmpty: groups.length === 0
    })
  },

  onPlus(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    const item = getCart().find(i => i.serviceId === id)
    if (item) setCartQty(id, item.qty + 1)
    this.refresh()
  },

  onMinus(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    const item = getCart().find(i => i.serviceId === id)
    if (item) setCartQty(id, item.qty - 1)
    this.refresh()
  },

  goDetail(e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  checkout() {
    if (this.data.isEmpty) {
      toast('购物车是空的')
      return
    }
    wx.navigateTo({ url: '/pages/order-confirm/order-confirm' })
  },

  clearAll() {
    wx.showModal({
      title: '清空购物车',
      content: '确定清空全部服务吗？',
      success: (res) => {
        if (res.confirm) {
          clearCart()
          this.refresh()
        }
      }
    })
  }
})
