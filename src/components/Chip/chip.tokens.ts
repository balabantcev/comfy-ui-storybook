// Chip tokens — synced from Figma "❖ Comfy UI" / Chips
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=13502-8397
//
// Sizes reuse the Button scale (BUTTON_SIZES). Types map to design tokens.

export type ChipType = 'dark' | 'grey' | 'primary' | 'secondary'

export const CHIP_TYPES: ChipType[] = ['dark', 'grey', 'primary', 'secondary']

export const CHIP_SIZE_VALUES = [32, 40, 44, 48, 56]

// Embedded counter size per chip size
export const CHIP_COUNTER_SIZE: Record<number, number> = {
  32: 16,
  40: 20,
  44: 20,
  48: 24,
  56: 24,
}
