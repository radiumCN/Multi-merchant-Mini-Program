declare interface IAppOption {
  globalData: {
    merchantId: string
    user: {
      nickName: string
      avatarUrl: string
    }
    cartCount: number
  }
}
