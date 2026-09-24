export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function toast(title: string) {
  wx.showToast({ title, icon: 'none' })
}

export function go(url: string) {
  if (url.startsWith('/pages/index') || url.startsWith('/pages/category') ||
      url.startsWith('/pages/service') || url.startsWith('/pages/mine')) {
    wx.switchTab({ url })
  } else {
    wx.navigateTo({ url })
  }
}
