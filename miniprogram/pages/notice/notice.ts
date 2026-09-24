const CONTENT: Record<string, { title: string; lines: string[] }> = {
  desc: {
    title: '服务说明',
    lines: [
      '1. 本服务由入驻门店师傅上门完成，下单后门店将在 30 分钟内电话确认时间。',
      '2. 请保持电话畅通，并提前清空作业区域，贵重物品请自行收好。',
      '3. 标价为起步参考价；如现场范围超出（如油污过重、层高过高），师傅会先评估并征得您同意后再施工。',
      '4. 服务完成后请现场验收，如有不满意可在 24 小时内申请返工或客服介入。',
      '5. 具体服务范围以门店确认单为准。'
    ]
  },
  guarantee: {
    title: '服务保障',
    lines: [
      '1. 自营/认证团队：师傅实名备案、技能考核后方可上岗。',
      '2. 价格透明：明码标价，无隐性消费；评估后调价需您确认。',
      '3. 质保无忧：清洗类项目质保 7 天，同一问题免费返修。',
      '4. 财产保障：服务过程中造成的损坏，按平台规则协商赔付。',
      '5. 不满意可申诉：联系在线客服，平台介入处理。'
    ]
  }
}

Page({
  data: {
    title: '服务说明',
    lines: [] as string[]
  },

  onLoad(query: Record<string, string | undefined>) {
    const type = query.type === 'guarantee' ? 'guarantee' : 'desc'
    const item = CONTENT[type]
    this.setData({
      title: item.title,
      lines: item.lines
    })
    wx.setNavigationBarTitle({ title: item.title })
  }
})
