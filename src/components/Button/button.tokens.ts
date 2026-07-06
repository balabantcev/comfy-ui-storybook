// Button tokens — synced from Figma "❖ Comfy UI" / Components / Button
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=11111-135
//
// Size scale (height → padding / radius / font / icon), measured from the
// Figma variants. Values in px.

export interface ButtonSizeSpec {
  py: number
  px: number
  radius: number
  /** Typography token name (see typography.ts) driving font-size & line-height */
  font: string
  fontSize: number
  lineHeight: number
  icon: number
  gap: number
}

export const BUTTON_SIZES: Record<number, ButtonSizeSpec> = {
  16: { py: 2, px: 4, radius: 4, font: 'caption-1', fontSize: 12, lineHeight: 16, icon: 12, gap: 2 },
  20: { py: 2, px: 6, radius: 6, font: 'caption-1', fontSize: 12, lineHeight: 16, icon: 14, gap: 4 },
  24: { py: 4, px: 8, radius: 6, font: 'caption-1', fontSize: 12, lineHeight: 16, icon: 16, gap: 4 },
  32: { py: 6, px: 12, radius: 8, font: 'body-2', fontSize: 14, lineHeight: 20, icon: 16, gap: 6 },
  40: { py: 10, px: 14, radius: 10, font: 'body-2', fontSize: 14, lineHeight: 20, icon: 18, gap: 6 },
  44: { py: 10, px: 16, radius: 10, font: 'body-1', fontSize: 16, lineHeight: 22, icon: 20, gap: 8 },
  48: { py: 12, px: 20, radius: 10, font: 'body-1', fontSize: 16, lineHeight: 22, icon: 20, gap: 8 },
  56: { py: 16, px: 24, radius: 12, font: 'label-3', fontSize: 18, lineHeight: 24, icon: 24, gap: 8 },
}

export const BUTTON_SIZE_VALUES = Object.keys(BUTTON_SIZES).map(Number)

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link'
export type ButtonIntent = 'brand' | 'gray' | 'destructive'

export const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'link']
export const BUTTON_INTENTS: ButtonIntent[] = ['brand', 'gray', 'destructive']
