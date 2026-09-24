import {
  getMerchant, getServices, setCurrentMerchant
} from '../../data/mock'
import { toast } from '../../utils/util'

const app = getApp<IAppOption>()

Page({
  data: {
    merchant: {} as ReturnType<typeof getMerchant>,
    services: [] as ReturnType<typeof getServices>
  },

  onLoad(query: Record<string, string | undefined>) {
    const id = query.id || 'm1'
    const merchant = getMerchant(id)
    if (!merchant) {
      toast('门店不存在')
      return
    }
    this.setData({
      merchant,
      services: getServices(id)
    })
    wx.setNavigationBarTitle({ title: merchant.short })
  },

  useShop() {
    const m = this.data.merchant
    if (!m || !m.id) return
    setCurrentMerchant(m.id)
    app.globalData.merchantId = m.id
    toast('已切换到本店')
  },

  onService(e: WechatMiniprogram.CustomEvent) {
    const id = (e.detail && e.detail.id) as string
    if (!id) return
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  callPhone() {
    const m = this.data.merchant
    if (m && m.phone) wx.makePhoneCall({ phoneNumber: m.phone })
  },

  /** 唤起地图导航到门店 */
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
