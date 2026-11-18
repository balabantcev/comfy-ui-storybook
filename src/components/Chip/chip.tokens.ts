// Chip tokens — synced from Figma "❖ Comfy UI" / Chips
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=13502-8397
//
// Sizes reuse the Button scale (BUTTON_SIZES). Types map to design tokens.

// Names mirror Figma "Type": Dark / Grey / Primary brand / Secondary brand.
// BREAKING (Figma 1.1.0 sync): the old `primary` is now `secondary-brand` (outlined) and the
// old `secondary` is now `primary-brand` (tinted fill) — they were swapped relative to Figma.
export type ChipType = 'dark' | 'grey' | 'primary-brand' | 'secondary-brand'

export const CHIP_TYPES: ChipType[] = ['dark', 'grey', 'primary-brand', 'secondary-brand']

export const CHIP_SIZE_VALUES = [32, 40, 44, 48, 56]

// Embedded counter size per chip size
export const CHIP_COUNTER_SIZE: Record<number, number> = {
  32: 16,
  40: 20,
  44: 20,
  48: 24,
  56: 24,
}
