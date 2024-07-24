export const spiritKeys = ['cat', 'chikun', 'dog', 'fish', 'prairie-dog', 'snake'] as const

export interface Spirit {
  key: (typeof spiritKeys)[number]
  name: string
  description: string
  lines: string
  service: 'coming-soon'
  trial: 'coming-soon'
}

export const spirits: Spirit[] = [
  {
    key: 'cat',
    name: '無形之星靈',
    description: '',
    lines: '人類，試煉或服務，愛玩不玩。',
    service: 'coming-soon',
    trial: 'coming-soon'
  },
  {
    key: 'chikun',
    name: '冠之星靈',
    description: '',
    lines: '我喜歡唱、跳、RAP、籃球，你呢？',
    service: 'coming-soon',
    trial: 'coming-soon'
  },
  {
    key: 'dog',
    name: '牙之星靈',
    description: '',
    lines: '汪！來玩～快跟我玩～',
    service: 'coming-soon',
    trial: 'coming-soon'
  },
  {
    key: 'fish',
    name: '鰭之星靈',
    description: '',
    lines: '嗨～我親愛的訪客，快來跟我說說你最近的趣聞。',
    service: 'coming-soon',
    trial: 'coming-soon'
  },
  {
    key: 'prairie-dog',
    name: '爪之星靈',
    description: '',
    lines: '……（呆滯貌）',
    service: 'coming-soon',
    trial: 'coming-soon'
  },
  {
    key: 'snake',
    name: '環之星靈',
    description: '',
    lines: '喲！小白鼠，原來上次實驗消失的不是你呀。',
    service: 'coming-soon',
    trial: 'coming-soon'
  },
]