/**
 * 多商户数据层（本地 mock，可替换为接口）
 */
export interface Merchant {
  id: string
  name: string
  short: string
  slogan: string
  phone: string
  address: string
  latitude: number
  longitude: number
  rating: number
  monthly: number
  tags: string[]
  theme: string
  distance: string
}

export interface Category {
  id: string
  name: string
  icon: string
  theme: string
}

export interface Service {
  id: string
  merchantId: string
  categoryId: string
  name: string
  desc: string
  price: number
  unit: string
  originPrice: number
  sales: number
  theme: string
  hot?: boolean
}

export interface OrderItem {
  serviceId: string
  name: string
  price: number
  qty: number
}

export interface Order {
  id: string
  merchantId: string
  merchantName: string
  items: OrderItem[]
  total: number
  /** 待支付 | 待服务 | 已完成 | 已取消 */
  status: string
  createdAt: string
  type: 'service' | 'goods'
}

export interface Address {
  id: string
  name: string
  phone: string
  detail: string
  tag?: string
}

export const STATUS_SERVICE = ['全部', '待支付', '待服务', '已完成', '已取消'] as const
export const STATUS_GOODS = ['待支付', '待发货', '待收货', '已完成', '已取消'] as const

const merchants: Merchant[] = [
  {
    id: 'm1',
    name: '清洁狮家政（中山总店）',
    short: '清洁狮',
    slogan: '家电清洗 · 全屋保洁 · 上门服务',
    phone: '4008313888',
    address: '中山市中区七星岗街道火炬路1号',
    latitude: 22.5175,
    longitude: 113.3927,
    rating: 4.9,
    monthly: 2100,
    tags: ['自营团队', '专业高效', '极速上门'],
    theme: 'ph-green',
    distance: '0.8km'
  },
  {
    id: 'm2',
    name: '洁净到家（城南店）',
    short: '洁净到家',
    slogan: '深度清洁 · 甲醛治理 · 环保有效',
    phone: '18827961136',
    address: '中山市南区悦来南路 88 号',
    latitude: 22.495,
    longitude: 113.38,
    rating: 4.8,
    monthly: 1560,
    tags: ['价格透明', '质保无忧', '环保有效'],
    theme: 'ph-teal',
    distance: '1.5km'
  },
  {
    id: 'm3',
    name: '绿净管家（东区店）',
    short: '绿净管家',
    slogan: '家居保养 · 软装清洗 · 酒店油烟',
    phone: '0760-88886666',
    address: '中山市东区起湾道 12 号',
    latitude: 22.52,
    longitude: 113.42,
    rating: 4.7,
    monthly: 980,
    tags: ['软装清洗', '母婴照护', '管道疏通'],
    theme: 'ph-blue',
    distance: '2.2km'
  },
  {
    id: 'm4',
    name: '洁邦工程（西区店）',
    short: '洁邦工程',
    slogan: '建筑物清洗 · 施工服务 · 有害生物防治',
    phone: '0760-22223333',
    address: '中山市西区翠景道 5 号',
    latitude: 22.52,
    longitude: 113.35,
    rating: 4.6,
    monthly: 760,
    tags: ['工程清洗', '施工服务', '防治服务'],
    theme: 'ph-orange',
    distance: '3.0km'
  }
]

const categories: Category[] = [
  { id: 'c1', name: '家电清洗', icon: '洗', theme: 'ph-green' },
  { id: 'c2', name: '全屋保洁', icon: '洁', theme: 'ph-teal' },
  { id: 'c3', name: '家居清洗', icon: '居', theme: 'ph-blue' },
  { id: 'c4', name: '维修安装', icon: '修', theme: 'ph-orange' },
  { id: 'c5', name: '家居保养', icon: '养', theme: 'ph-purple' },
  { id: 'c6', name: '建筑物清洗', icon: '筑', theme: 'ph-red' },
  { id: 'c7', name: '甲醛水质检测', icon: '检', theme: 'ph-green' },
  { id: 'c8', name: '有害生物防治', icon: '防', theme: 'ph-teal' }
]

const services: Service[] = [
  // m1 家电清洗
  { id: 's1', merchantId: 'm1', categoryId: 'c1', name: '空调清洗', desc: '免拆清洗 · 高温除菌 · 深层清洁', price: 80, unit: '台', originPrice: 120, sales: 328, theme: 'ph-green', hot: true },
  { id: 's2', merchantId: 'm1', categoryId: 'c1', name: '冰箱清洗', desc: '除霜除味 · 分区消毒 · 去除细菌', price: 118, unit: '台', originPrice: 160, sales: 206, theme: 'ph-teal', hot: true },
  { id: 's3', merchantId: 'm1', categoryId: 'c1', name: '油烟机清洗', desc: '深度清洗 · 免拆清洗 · 过滤养护', price: 168, unit: '台', originPrice: 198, sales: 451, theme: 'ph-orange', hot: true },
  { id: 's4', merchantId: 'm1', categoryId: 'c1', name: '洗衣机清洗', desc: '内筒拆洗 · 高温杀菌 · 去除污垢', price: 100, unit: '台', originPrice: 160, sales: 389, theme: 'ph-blue', hot: true },
  { id: 's5', merchantId: 'm1', categoryId: 'c1', name: '热水器清洗', desc: '内胆除垢 · 出水更干净', price: 20, unit: '根', originPrice: 35, sales: 120, theme: 'ph-green' },
  { id: 's6', merchantId: 'm1', categoryId: 'c4', name: '家电维修', desc: '空调/洗衣机/冰箱故障检测维修', price: 10, unit: '次', originPrice: 30, sales: 88, theme: 'ph-orange', hot: true },
  { id: 's7', merchantId: 'm1', categoryId: 'c2', name: '日常保洁', desc: '2 小时上门 · 自带工具', price: 60, unit: '次', originPrice: 80, sales: 512, theme: 'ph-teal' },
  { id: 's8', merchantId: 'm1', categoryId: 'c2', name: '深度保洁', desc: '厨卫重点 · 高温清洗 · 去污养护', price: 120, unit: '次', originPrice: 168, sales: 267, theme: 'ph-green' },

  // m2
  { id: 's10', merchantId: 'm2', categoryId: 'c7', name: '甲醛检测治理', desc: 'CMA 检测 · 母婴级环保药剂', price: 200, unit: '次', originPrice: 280, sales: 96, theme: 'ph-green', hot: true },
  { id: 's11', merchantId: 'm2', categoryId: 'c7', name: '水质检测', desc: '生活饮用水安全检测', price: 88, unit: '次', originPrice: 120, sales: 64, theme: 'ph-teal' },
  { id: 's12', merchantId: 'm2', categoryId: 'c2', name: '开荒保洁', desc: '新房入住前精细清洁', price: 300, unit: '次', originPrice: 400, sales: 150, theme: 'ph-blue', hot: true },
  { id: 's13', merchantId: 'm2', categoryId: 'c3', name: '地毯清洗', desc: '深度除螨 · 快速风干', price: 15, unit: '㎡', originPrice: 25, sales: 88, theme: 'ph-orange' },

  // m3
  { id: 's20', merchantId: 'm3', categoryId: 'c5', name: '沙发保养', desc: '皮质/布艺养护 · 上门服务', price: 180, unit: '次', originPrice: 240, sales: 72, theme: 'ph-purple', hot: true },
  { id: 's21', merchantId: 'm3', categoryId: 'c3', name: '窗帘清洗', desc: '拆装清洗 · 熨烫复位', price: 25, unit: '㎡', originPrice: 35, sales: 110, theme: 'ph-blue' },
  { id: 's22', merchantId: 'm3', categoryId: 'c3', name: '床垫除螨', desc: '高温除螨 · 深层净化', price: 99, unit: '次', originPrice: 139, sales: 203, theme: 'ph-teal', hot: true },
  { id: 's23', merchantId: 'm3', categoryId: 'c4', name: '管道疏通', desc: '厨房/卫生间/地漏疏通', price: 80, unit: '次', originPrice: 100, sales: 340, theme: 'ph-orange' },

  // m4
  { id: 's30', merchantId: 'm4', categoryId: 'c6', name: '外墙清洗', desc: '高空作业 · 持证上岗', price: 8, unit: '㎡', originPrice: 12, sales: 45, theme: 'ph-red', hot: true },
  { id: 's31', merchantId: 'm4', categoryId: 'c8', name: '除甲醛施工', desc: '工装/家装治理服务', price: 20, unit: '㎡', originPrice: 28, sales: 60, theme: 'ph-green' },
  { id: 's32', merchantId: 'm4', categoryId: 'c8', name: '有害生物防治', desc: '四害消杀 · 质保一年', price: 120, unit: '次', originPrice: 160, sales: 180, theme: 'ph-orange', hot: true },
  { id: 's33', merchantId: 'm4', categoryId: 'c1', name: '商用油烟罩清洗', desc: '食堂/餐厅净化器清洗', price: 200, unit: '次', originPrice: 260, sales: 55, theme: 'ph-red' }
]

const addresses: Address[] = [
  { id: 'a1', name: '市集常客', phone: '138****826', detail: '创意园 A座 12F', tag: '家' },
  { id: 'a2', name: '公司前台', phone: '0760-8888', detail: '中山市中区七星岗街道火炬路 1 号', tag: '公司' }
]

/** 全局可变数据（购物车 / 订单） */
export const db = {
  merchants,
  categories,
  services,
  addresses,
  orders: [] as Order[],
  cart: [] as OrderItem[],
  currentMerchantId: 'm1',
  currentAddressId: 'a1',
  loaded: false
}

function persist() {
  try {
    wx.setStorageSync('mm_orders', db.orders)
    wx.setStorageSync('mm_cart', db.cart)
    wx.setStorageSync('mm_merchant_id', db.currentMerchantId)
  } catch (e) {
    // ignore storage errors
  }
}

/** 首次启动的演示订单，便于查看列表 UI */
function seedOrders(): Order[] {
  return [
    {
      id: 'MJ100001',
      merchantId: 'm1',
      merchantName: '清洁狮家政（中山总店）',
      items: [
        { serviceId: 's1', name: '空调清洗', price: 80, qty: 1 },
        { serviceId: 's4', name: '洗衣机清洗', price: 100, qty: 1 }
      ],
      total: 180,
      status: '待服务',
      createdAt: '2026-09-20 10:30',
      type: 'service'
    },
    {
      id: 'MJ100002',
      merchantId: 'm1',
      merchantName: '清洁狮家政（中山总店）',
      items: [{ serviceId: 's3', name: '油烟机清洗', price: 168, qty: 1 }],
      total: 168,
      status: '待支付',
      createdAt: '2026-09-21 15:12',
      type: 'service'
    },
    {
      id: 'MJ100003',
      merchantId: 'm2',
      merchantName: '洁净到家（城南店）',
      items: [{ serviceId: 's12', name: '开荒保洁', price: 300, qty: 1 }],
      total: 300,
      status: '已完成',
      createdAt: '2026-09-18 09:05',
      type: 'service'
    },
    {
      id: 'MJ100004',
      merchantId: 'm3',
      merchantName: '绿净管家（东区店）',
      items: [{ serviceId: 's22', name: '床垫除螨', price: 99, qty: 2 }],
      total: 198,
      status: '已取消',
      createdAt: '2026-09-16 20:40',
      type: 'service'
    }
  ]
}

/** 幂等初始化：优先读缓存，空则写入演示订单 */
export function loadMock() {
  if (db.loaded) return
  db.loaded = true

  let cached: Order[] | null = null
  try {
    const raw = wx.getStorageSync('mm_orders')
    if (raw && Array.isArray(raw)) cached = raw as Order[]
  } catch (e) {
    cached = null
  }

  if (cached && cached.length) {
    db.orders = cached
  } else {
    db.orders = seedOrders()
  }

  try {
    const cart = wx.getStorageSync('mm_cart')
    if (cart && Array.isArray(cart)) db.cart = cart as OrderItem[]
  } catch (e) {
    // ignore
  }

  try {
    const mid = wx.getStorageSync('mm_merchant_id')
    if (mid) db.currentMerchantId = mid
  } catch (e) {
    // ignore
  }

  persist()
}

/** 任何读取订单前调用，避免页面早于 onLaunch */
export function ensureOrders() {
  if (!db.loaded) loadMock()
  if (!db.orders || !db.orders.length) {
    db.orders = seedOrders()
    persist()
  }
}

export function getMerchants() { return db.merchants }
export function getMerchant(id: string) { return db.merchants.find(m => m.id === id) }
export function getCategories() { return db.categories }
export function getCategory(id: string) { return db.categories.find(c => c.id === id) }

export function getServices(merchantId?: string, categoryId?: string) {
  return db.services.filter(s =>
    (!merchantId || s.merchantId === merchantId) &&
    (!categoryId || s.categoryId === categoryId)
  )
}

export function getService(id: string) { return db.services.find(s => s.id === id) }
export function getAddresses() { return db.addresses }
export function getAddress(id: string) { return db.addresses.find(a => a.id === id) }

export function setCurrentMerchant(id: string) {
  db.currentMerchantId = id
  persist()
}

export function getCart() { return db.cart }

export function addToCart(serviceId: string, qty = 1) {
  const svc = getService(serviceId)
  if (!svc) return
  const exist = db.cart.find(i => i.serviceId === serviceId)
  if (exist) exist.qty += qty
  else db.cart.push({ serviceId, name: svc.name, price: svc.price, qty })
  persist()
}

export function setCartQty(serviceId: string, qty: number) {
  const idx = db.cart.findIndex(i => i.serviceId === serviceId)
  if (idx < 0) return
  if (qty <= 0) db.cart.splice(idx, 1)
  else db.cart[idx].qty = qty
  persist()
}

export function clearCart(serviceIds?: string[]) {
  if (!serviceIds) db.cart = []
  else db.cart = db.cart.filter(i => !serviceIds.includes(i.serviceId))
  persist()
}

export function cartCount() {
  return db.cart.reduce((s, i) => s + i.qty, 0)
}

export function cartTotal() {
  return db.cart.reduce((s, i) => s + i.price * i.qty, 0)
}

export function createOrders(items: OrderItem[], merchantId: string): Order {
  ensureOrders()
  const merchant = getMerchant(merchantId)
  const now = new Date()
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n)
  const order: Order = {
    id: 'MJ' + String(now.getTime()).slice(-8),
    merchantId,
    merchantName: merchant ? merchant.name : merchantId,
    items: items.map(i => ({ ...i })),
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    status: '待服务',
    createdAt: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
    type: 'service'
  }
  db.orders.unshift(order)
  persist()
  return order
}

export function getOrders(status?: string): Order[] {
  ensureOrders()
  const all = db.orders
  if (!status || status === '全部') return all
  return all.filter(o => o.status === status)
}

export function payOrder(id: string) {
  const o = db.orders.find(x => x.id === id)
  if (o) {
    o.status = '待服务'
    persist()
  }
}

export function cancelOrder(id: string) {
  const o = db.orders.find(x => x.id === id)
  if (o) {
    o.status = '已取消'
    persist()
  }
}

export function countOrders(status: string) {
  ensureOrders()
  return db.orders.filter(o => o.status === status).length
}
