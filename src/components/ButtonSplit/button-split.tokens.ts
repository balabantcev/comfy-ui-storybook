// Button Split tokens — Figma "❖ Comfy UI" / Button Split (node 16855:8109)

/** Figma "Type" */
export type ButtonSplitType =
  | 'primary'
  | 'primary-subtle'
  | 'secondary-brand'
  | 'secondary-gray'
  | 'tertiary-brand'
  | 'tertiary-gray'
export type ButtonSplitSize = 32 | 40 | 44 | 48 | 56

export const BUTTON_SPLIT_TYPES: ButtonSplitType[] = [
  'primary',
  'primary-subtle',
  'secondary-brand',
  'secondary-gray',
  'tertiary-brand',
  'tertiary-gray',
]
export const BUTTON_SPLIT_SIZES: ButtonSplitSize[] = [32, 40, 44, 48, 56]

/** Button classes (button.css) per type — colors, hover, focus and disabled come from Button */
export const BUTTON_SPLIT_CLASSES: Record<ButtonSplitType, string[]> = {
  primary: ['btn--primary', 'btn--brand'],
  'primary-subtle': ['btn--primary', 'btn--brand', 'btn--subtle'],
  'secondary-brand': ['btn--secondary', 'btn--brand'],
  'secondary-gray': ['btn--secondary', 'btn--gray'],
  'tertiary-brand': ['btn--tertiary', 'btn--brand'],
  'tertiary-gray': ['btn--tertiary', 'btn--gray'],
}

export interface ButtonSplitSizeSpec {
  /** main part padding: top/bottom (the height is fixed, kept for reference), right, left (Figma "Button") */
  py: number
  pr: number
  pl: number
  gap: number
  /** dropdown part padding: top/bottom, sides (Figma "Dropdown control") */
  dy: number
  dx: number
  icon: number
  radius: number
  font: 'body-2' | 'body-1' | 'label-3'
}

export const BUTTON_SPLIT_SIZE_SPECS: Record<ButtonSplitSize, ButtonSplitSizeSpec> = {
  32: { py: 4, pr: 10, pl: 12, gap: 4, dy: 8, dx: 6, icon: 16, radius: 8, font: 'body-2' },
  40: { py: 8, pr: 10, pl: 14, gap: 4, dy: 10, dx: 8, icon: 20, radius: 10, font: 'body-2' },
  44: { py: 10, pr: 12, pl: 16, gap: 6, dy: 12, dx: 10, icon: 20, radius: 10, font: 'body-1' },
  48: { py: 12, pr: 14, pl: 20, gap: 6, dy: 12, dx: 10, icon: 24, radius: 10, font: 'body-1' },
  56: { py: 14, pr: 16, pl: 24, gap: 8, dy: 16, dx: 12, icon: 24, radius: 12, font: 'label-3' },
}
