// Counter (notification badge) tokens — synced from Figma "❖ Comfy UI" / Counter
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=13472-795

export interface CounterSizeSpec {
  px: number
  font: string
  fontSize: number
  lineHeight: number
}

export const COUNTER_SIZES: Record<number, CounterSizeSpec> = {
  16: { px: 4, font: 'caption-2', fontSize: 10, lineHeight: 14 },
  20: { px: 4, font: 'caption-1', fontSize: 12, lineHeight: 16 },
  24: { px: 6, font: 'body-2', fontSize: 14, lineHeight: 20 },
}

export const COUNTER_SIZE_VALUES = Object.keys(COUNTER_SIZES).map(Number)

export type CounterColor = 'orange' | 'brand' | 'red' | 'grey' | 'modern'

export const COUNTER_COLORS: CounterColor[] = ['orange', 'brand', 'red', 'grey', 'modern']
