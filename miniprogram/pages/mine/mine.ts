import {
  countOrders, getAddresses, getAddress, cartCount
} from '../../data/mock'

const app = getApp<IAppOption>()

Page({
  data: {
    nickName: '客户0946',
    avatarUrl: '',
    serviceStats: [
      { key: '待支付', label: '待支付', theme: 'ph-orange' },
      { key: '待服务', label: '待服务', theme: 'ph-green' },
      { key: '已完成', label: '已完成', theme: 'ph-teal' },
      { key: '已取消', label: '已取消', theme: 'ph-blue' }
    ] as { key: string; label: string; theme: string; count?: number }[],
    goodsStats: [
      { key: '待支付', label: '待支付', theme: 'ph-orange' },
      { key: '待发货', label: '待发货', theme: 'ph-green' },
      { key: '待收货', label: '待收货', theme: 'ph-teal' },
      { key: '已完成', label: '已完成', theme: 'ph-blue' },
      { key: '已取消', label: '已取消', theme: 'ph-red' }
    ] as { key: string; label: string; theme: string }[],
    myServices: [
      { key: 'coupon', label: '优惠券', theme: 'ph-orange', icon: '券' },
      { key: 'card', label: '兑换卡/券', theme: 'ph-red', icon: '卡' },
      { key: 'exchange', label: '我的兑换', theme: 'ph-green', icon: '兑' },
      { key: 'shop', label: '联系门店', theme: 'ph-orange', icon: '店' },
      { key: 'switch', label: '切换门店', theme: 'ph-teal', icon: '换' },
      { key: 'setting', label: '更多设置', theme: 'ph-blue', icon: '设' }
    ],
    balance: 0,
    points: 0,
    addressText: '暂无地址',
    cartCount: 0,
    orderCounts: {} as Record<string, number>
  },

  onShow() {
    const addr = getAddress('a1') || getAddresses()[0]
    const serviceStats = this.data.serviceStats.map(s => ({
      ...s,
      count: countOrders(s.key)
    }))
    this.setData({
      nickName: app.globalData.user.nickName,
      serviceStats,
      addressText: addr ? addr.detail : '暂无地址',
      cartCount: cartCount(),
      orderCounts: {
        '待支付': countOrders('待支付'),
        '待服务': countOrders('待服务'),
        '已完成': countOrders('已完成'),
        '已取消': countOrders('已取消')
      }
    })
  },

  goOrders(e: WechatMiniprogram.TouchEvent) {
    const st = (e.currentTarget.dataset.status as string) || '全部'
    // 订单已是 tabBar 页，用 storage 传状态
    wx.setStorageSync('mm_orders_status', st)
    wx.switchTab({ url: '/pages/orders/orders' })
  },

  goCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  goAddress() {
    wx.navigateTo({ url: '/pages/address/address' })
  },

  goMerchants() {
    wx.navigateTo({ url: '/pages/merchants/merchants' })
  },

  onServiceTap(e: WechatMiniprogram.TouchEvent) {
    const key = e.currentTarget.dataset.key as string
    if (key === 'switch' || key === 'shop') {
      this.goMerchants()
      return
    }
    wx.showToast({ title: '功能建设中', icon: 'none' })
  },

  callPhone() {
    wx.makePhoneCall({ phoneNumber: '4008313888' })
  }
})
