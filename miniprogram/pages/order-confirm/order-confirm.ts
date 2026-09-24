import {
  getCart, getService, getMerchant, getAddress, getAddresses,
  createOrders, clearCart
} from '../../data/mock'
import { toast } from '../../utils/util'

Page({
  data: {
    address: {} as ReturnType<typeof getAddress>,
    groups: [] as {
      merchantId: string
      merchantName: string
      items: { serviceId: string; name: string; price: number; qty: number }[]
      sum: number
    }[],
    goodsTotal: 0,
    fee: 0,
    payTotal: 0,
    ids: '' as string
  },

  onLoad(query: Record<string, string | undefined>) {
    this.setData({ ids: query.ids || '' })
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const addr = getAddress('a1') || getAddresses()[0]
    const ids = this.data.ids ? this.data.ids.split(',') : null
    const cart = getCart().filter(i => !ids || ids.includes(i.serviceId))

    const map = new Map<string, typeof cart>()
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
        items,
        sum: items.reduce((s, i) => s + i.price * i.qty, 0)
      }
    })
    const goodsTotal = groups.reduce((s, g) => s + g.sum, 0)
    const fee = groups.length > 0 ? 5 * groups.length : 0
    this.setData({
      address: addr,
      groups,
      goodsTotal,
      fee,
      payTotal: goodsTotal + fee
    })
  },

  submit() {
    const { groups, address } = this.data
    if (!groups.length) {
      toast('没有待结算的服务')
      return
    }
    if (!address) {
      toast('请选择服务地址')
      return
    }
    wx.showLoading({ title: '提交中' })
    setTimeout(() => {
      groups.forEach(g => {
        createOrders(g.items, g.merchantId)
      })
      const idList = groups.flatMap(g => g.items.map(i => i.serviceId))
      clearCart(idList)
      wx.hideLoading()
      wx.showToast({ title: '预约成功', icon: 'success' })
      setTimeout(() => {
        wx.setStorageSync('mm_orders_status', '待服务')
        wx.switchTab({ url: '/pages/orders/orders' })
      }, 600)
    }, 400)
  },

  goAddress() {
    wx.navigateTo({ url: '/pages/address/address' })
  }
})
