export const spiritKeys = ['cat', 'chikun', 'dog', 'fish', 'prairie-dog', 'snake'] as const

export interface Spirit {
  key: (typeof spiritKeys)[number]
  name: string
  description: string
}

export const spirits: Spirit[] = [
  {
    key: 'cat',
    name: '無形之星靈',
    description: ''
  },
  {
    key: 'chikun',
    name: '冠之星靈',
    description: ''
  },
  {
    key: 'dog',
    name: '牙之星靈',
    description: ''
  },
  {
    key: 'fish',
    name: '鰭之星靈',
    description: ''
  },
  {
    key: 'prairie-dog',
    name: '爪之星靈',
    description: ''
  },
  {
    key: 'snake',
    name: '環之星靈',
    description: ''
  },
]