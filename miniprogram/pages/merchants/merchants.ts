import { getMerchants, setCurrentMerchant } from '../../data/mock'

const app = getApp<IAppOption>()

Page({
  data: {
    list: [] as ReturnType<typeof getMerchants>,
    currentId: ''
  },

  onShow() {
    this.setData({
      list: getMerchants(),
      currentId: app.globalData.merchantId
    })
  },

  onPick(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    setCurrentMerchant(id)
    app.globalData.merchantId = id
    this.setData({ currentId: id })
    wx.showToast({ title: '已切换门店', icon: 'success' })
  },

  onDetail(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    wx.navigateTo({ url: '/pages/merchant/merchant?id=' + id })
  }
})
