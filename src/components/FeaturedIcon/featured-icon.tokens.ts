// Featured icon tokens — synced from Figma "❖ Comfy UI" / Misc icons / Featured icon
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=15030-853

export type FeaturedIconType = 'light' | 'gradient' | 'outline' | 'modern'
// Figma "Success" is the brand green (utility-brand-*)
export type FeaturedIconColor = 'gray' | 'success' | 'warning' | 'error' | 'purple' | 'blue'
export type FeaturedIconSize = 32 | 40 | 48 | 56

export const FEATURED_ICON_TYPES: FeaturedIconType[] = ['light', 'gradient', 'outline', 'modern']
export const FEATURED_ICON_COLORS: FeaturedIconColor[] = ['gray', 'success', 'warning', 'error', 'purple', 'blue']
export const FEATURED_ICON_SIZES: FeaturedIconSize[] = [32, 40, 48, 56]

export interface FeaturedIconSizeSpec {
  /** Glyph size (Light / Outline / Modern) */
  icon: number
  /** Gradient: solid inner disc and its glyph */
  gradientInner: number
  gradientIcon: number
  /** Outline: outer ring diameter (the inner ring is 10px smaller) */
  ring: number
  /** Modern: inner disc diameter (4px inset) */
  modernInner: number
}

export const FEATURED_ICON_SPECS: Record<FeaturedIconSize, FeaturedIconSizeSpec> = {
  32: { icon: 16, gradientInner: 24, gradientIcon: 16, ring: 32, modernInner: 24 },
  40: { icon: 20, gradientInner: 28, gradientIcon: 16, ring: 36, modernInner: 32 },
  48: { icon: 24, gradientInner: 32, gradientIcon: 20, ring: 40, modernInner: 40 },
  56: { icon: 28, gradientInner: 36, gradientIcon: 20, ring: 44, modernInner: 48 },
}
