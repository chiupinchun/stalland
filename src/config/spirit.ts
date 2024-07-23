export const spiritKeys = ['cat', 'chikun', 'dog', 'fish', 'prairie-dog', 'snake'] as const

export interface Spirit {
  key: (typeof spiritKeys)[number]
  name: string
  description: string
  lines: string
}

export const spirits: Spirit[] = [
  {
    key: 'cat',
    name: '無形之星靈',
    description: '',
    lines: '人類，試煉或服務，愛玩不玩。'
  },
  {
    key: 'chikun',
    name: '冠之星靈',
    description: '',
    lines: '我喜歡唱、跳、RAP、籃球，你呢？'
  },
  {
    key: 'dog',
    name: '牙之星靈',
    description: '',
    lines: '汪！來玩～快跟我玩～'
  },
  {
    key: 'fish',
    name: '鰭之星靈',
    description: '',
    lines: '嗨～我親愛的訪客，快來跟我說說你最近的趣聞。'
  },
  {
    key: 'prairie-dog',
    name: '爪之星靈',
    description: '',
    lines: '……（呆滯貌）'
  },
  {
    key: 'snake',
    name: '環之星靈',
    description: '',
    lines: '喲！小白鼠，原來上次實驗消失的不是你呀。'
  },
]