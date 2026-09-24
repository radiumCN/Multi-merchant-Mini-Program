import {
  getCategories, getServices, getMerchant, getMerchants, setCurrentMerchant
} from '../../data/mock'

const app = getApp<IAppOption>()

Page({
  data: {
    categories: [] as ReturnType<typeof getCategories>,
    activeId: '',
    services: [] as ReturnType<typeof getServices>,
    merchantName: '',
    keyword: ''
  },

  onLoad(query: Record<string, string | undefined>) {
    const cats = getCategories()
    const activeId = query.cid || (cats[0] && cats[0].id) || ''
    this.setData({ categories: cats, activeId })
    this.loadServices()
  },

  onShow() {
    this.syncMerchant()
    this.loadServices()
  },

  syncMerchant() {
    const m = getMerchant(app.globalData.merchantId)
    this.setData({ merchantName: m ? m.name : '' })
  },

  loadServices() {
    const mid = app.globalData.merchantId
    const keyword = this.data.keyword.trim()
    let list = getServices(mid, this.data.activeId)
    if (keyword) {
      list = getServices(mid).filter(s =>
        s.name.includes(keyword) || s.desc.includes(keyword)
      )
    }
    this.setData({ services: list })
  },

  onCategory(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id as string
    this.setData({ activeId: id, keyword: '' })
    this.loadServices()
  },

  onSearchInput(e: WechatMiniprogram.Input) {
    this.setData({ keyword: e.detail.value })
    this.loadServices()
  },

  onSearchConfirm() {
    this.loadServices()
  },

  onSearchClear() {
    this.setData({ keyword: '' })
    this.loadServices()
  },

  onService(e: WechatMiniprogram.CustomEvent) {
    const id = (e.detail && e.detail.id) as string
    if (!id) return
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  /** 就地切换门店，不跳页，避免顶栏串台 */
  goMerchants() {
    const list = getMerchants()
    wx.showActionSheet({
      itemList: list.map(m => m.name).slice(0, 6),
      success: (res) => {
        const m = list[res.tapIndex]
        if (!m) return
        setCurrentMerchant(m.id)
        app.globalData.merchantId = m.id
        this.syncMerchant()
        this.loadServices()
        wx.showToast({ title: '已切换门店', icon: 'success' })
      }
    })
  }
})
