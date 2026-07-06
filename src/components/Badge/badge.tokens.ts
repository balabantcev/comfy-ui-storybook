// Badge tokens — synced from Figma "❖ Comfy UI" / Components / Badge
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=11287-911

export interface BadgeSizeSpec {
  height: number
  px: number
  font: string
  fontSize: number
  lineHeight: number
  dot: number
  icon: number
  gap: number
}

export const BADGE_SIZES: Record<number, BadgeSizeSpec> = {
  22: { height: 22, px: 6, font: 'caption-1', fontSize: 12, lineHeight: 16, dot: 8, icon: 14, gap: 4 },
  24: { height: 24, px: 6, font: 'caption-1', fontSize: 12, lineHeight: 16, dot: 8, icon: 16, gap: 4 },
  28: { height: 28, px: 6, font: 'body-2', fontSize: 14, lineHeight: 20, dot: 10, icon: 16, gap: 4 },
}

export const BADGE_SIZE_VALUES = Object.keys(BADGE_SIZES).map(Number)

export type BadgeVariant = 'default' | 'no-outline' | 'modern'
export type BadgeColor =
  | 'gray'
  | 'success'
  | 'warning'
  | 'error'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'yellow'

export const BADGE_VARIANTS: BadgeVariant[] = ['default', 'no-outline', 'modern']
export const BADGE_COLORS: BadgeColor[] = [
  'gray',
  'success',
  'warning',
  'error',
  'blue',
  'purple',
  'magenta',
  'yellow',
]
