import { getOrders, payOrder, cancelOrder, ensureOrders } from '../../data/mock'
import { toast } from '../../utils/util'

const TABS = ['全部', '待支付', '待服务', '已完成', '已取消']

Page({
  data: {
    tabs: TABS,
    active: 0,
    list: [] as ReturnType<typeof getOrders>
  },

  onLoad() {
    // 从「我的」跳入时用 storage 传状态（tab 页不能带 query）
    const st = wx.getStorageSync('mm_orders_status') || '全部'
    const active = Math.max(0, TABS.indexOf(st))
    this.setData({ active })
    wx.removeStorageSync('mm_orders_status')
  },

  onShow() {
    ensureOrders()
    this.refresh()
  },

  refresh() {
    ensureOrders()
    const st = TABS[this.data.active] || '全部'
    this.setData({ list: getOrders(st) })
  },

  onTab(e: WechatMiniprogram.CustomEvent) {
    const index = Number(e.detail.index || 0)
    this.setData({ active: index })
    this.refresh()
  },

  onPay(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    payOrder(id)
    toast('支付成功')
    this.refresh()
  },

  onCancel(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    cancelOrder(id)
    toast('已取消')
    this.refresh()
  },

  goDetail(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    const order = this.data.list.find(o => o.id === id)
    if (order && order.items[0]) {
      wx.navigateTo({ url: '/pages/detail/detail?id=' + order.items[0].serviceId })
    }
  },

  goCategory() {
    wx.switchTab({ url: '/pages/category/category' })
  }
})
