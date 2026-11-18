// Badge tokens — synced from Figma "❖ Comfy UI" / Components / Badge
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=11287-911

interface Spacing {
  /** padding-left / padding-right from the outer edge (Figma's 1px stroke sits inside it) */
  pl: number
  pr: number
  gap: number
}

export interface BadgeSizeSpec {
  height: number
  font: string
  fontSize: number
  lineHeight: number
  /** Figma 1.1.0: 16px icons and flags, 8px dot at every size */
  icon: number
  dot: number
  /** Type=Default (text in a 2px-padded frame, optional icons) / Dot / Country */
  default: Spacing
  dotted: Spacing
  country: Spacing
}

export const BADGE_SIZES: Record<number, BadgeSizeSpec> = {
  22: {
    height: 22, font: 'caption-1', fontSize: 12, lineHeight: 16, icon: 16, dot: 8,
    default: { pl: 4, pr: 4, gap: 2 }, dotted: { pl: 6, pr: 6, gap: 4 }, country: { pl: 3, pr: 6, gap: 4 },
  },
  24: {
    height: 24, font: 'body-2', fontSize: 14, lineHeight: 20, icon: 16, dot: 8,
    default: { pl: 4, pr: 4, gap: 2 }, dotted: { pl: 8, pr: 8, gap: 6 }, country: { pl: 4, pr: 6, gap: 6 },
  },
  28: {
    height: 28, font: 'body-2', fontSize: 14, lineHeight: 20, icon: 16, dot: 8,
    default: { pl: 6, pr: 6, gap: 2 }, dotted: { pl: 10, pr: 10, gap: 6 }, country: { pl: 6, pr: 8, gap: 6 },
  },
}

export const BADGE_SIZE_VALUES = Object.keys(BADGE_SIZES).map(Number)

export type BadgeVariant = 'default' | 'no-outline' | 'modern'
/** Figma "Type" — derived from the props: `dot` → Dot, `country` → Country, else Default */
export type BadgeType = 'default' | 'dot' | 'country'
// Figma 1.1.0 renamed the colors: the old orange "Warning" is now "Orange", and the old
// "Yellow" is now "Warning" (BREAKING — `warning` used to render orange).
export type BadgeColor =
  | 'gray'
  | 'success'
  | 'warning'
  | 'error'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'orange'

export const BADGE_VARIANTS: BadgeVariant[] = ['default', 'no-outline', 'modern']
export const BADGE_COLORS: BadgeColor[] = [
  'gray',
  'success',
  'warning',
  'error',
  'blue',
  'purple',
  'magenta',
  'orange',
]
