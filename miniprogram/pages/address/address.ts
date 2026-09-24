import { getAddresses, db } from '../../data/mock'

Page({
  data: {
    list: [] as ReturnType<typeof getAddresses>,
    currentId: ''
  },

  onShow() {
    this.setData({
      list: getAddresses(),
      currentId: db.currentAddressId
    })
  },

  onPick(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    db.currentAddressId = id
    this.setData({ currentId: id })
    wx.showToast({ title: '已选择地址', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 500)
  }
})
