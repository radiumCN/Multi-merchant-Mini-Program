// app.ts
import { loadMock, db } from './data/mock'

export interface IAppOption {
  globalData: {
    merchantId: string
    user: {
      nickName: string
      avatarUrl: string
    }
    cartCount: number
  }
}

App<IAppOption>({
  globalData: {
    merchantId: 'm1',
    user: {
      nickName: '客户0946',
      avatarUrl: ''
    },
    cartCount: 0
  },

  onLaunch() {
    loadMock()
    this.globalData.merchantId = db.currentMerchantId
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
})
