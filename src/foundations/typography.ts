// Typography tokens — synced from Figma "❖ Comfy UI" / Foundations / Typography
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=18-1951

export const fontFamily = 'Inter Variable'

// CSS font-family stack to use in the app (Inter Variable + sensible fallbacks)
export const fontFamilyStack =
  '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const

export type WeightName = 'Regular' | 'Medium' | 'Bold' | 'ExtraBold'

export const weightValue: Record<WeightName, number> = {
  Regular: 400,
  Medium: 500,
  Bold: 700,
  ExtraBold: 800,
}

// Viewport width below which the Figma "Mobile" typography mode applies.
// Not defined in Figma — a project assumption; change here and run `pnpm gen:tokens`.
export const mobileBreakpoint = 768

export interface TextStyle {
  /** Token name, e.g. "Title-1" */
  name: string
  /** Token path as it appears in Figma, e.g. "Title/Title-1" */
  token: string
  /** Font size in px */
  fontSize: number
  /** Line height in px */
  lineHeight: number
  /** Letter spacing in px */
  letterSpacing: number
  /** Weights that ship as named styles for this token */
  weights: WeightName[]
  /** Figma Typography → mode "Mobile" (only where it differs from Desktop) */
  mobile?: { fontSize: number; lineHeight: number }
}

export interface TypeGroup {
  name: string
  styles: TextStyle[]
}

const base = { letterSpacing: 0 }

export const typeGroups: TypeGroup[] = [
  {
    name: 'Title',
    styles: [
      { name: 'Title-1', token: 'Title/Title-1', fontSize: 72, lineHeight: 90, weights: ['Regular', 'Medium', 'Bold'], mobile: { fontSize: 48, lineHeight: 60 }, ...base },
      { name: 'Title-2', token: 'Title/Title-2', fontSize: 60, lineHeight: 72, weights: ['Regular', 'Medium', 'Bold'], mobile: { fontSize: 34, lineHeight: 42 }, ...base },
    ],
  },
  {
    name: 'Heading',
    styles: [
      { name: 'H1', token: 'Heading/H1', fontSize: 48, lineHeight: 60, weights: ['Regular', 'Medium', 'Bold', 'ExtraBold'], mobile: { fontSize: 34, lineHeight: 42 }, ...base },
      { name: 'H2', token: 'Heading/H2', fontSize: 34, lineHeight: 42, weights: ['Regular', 'Medium', 'Bold', 'ExtraBold'], mobile: { fontSize: 24, lineHeight: 32 }, ...base },
      { name: 'H3', token: 'Heading/H3', fontSize: 28, lineHeight: 36, weights: ['Regular', 'Medium', 'Bold', 'ExtraBold'], mobile: { fontSize: 18, lineHeight: 28 }, ...base },
    ],
  },
  {
    name: 'Label',
    styles: [
      { name: 'Label-1', token: 'Label/Label-1', fontSize: 24, lineHeight: 32, weights: ['Regular', 'Medium', 'Bold', 'ExtraBold'], ...base },
      { name: 'Label-2', token: 'Label/Label-2', fontSize: 20, lineHeight: 28, weights: ['Regular', 'Medium', 'Bold', 'ExtraBold'], ...base },
      { name: 'Label-3', token: 'Label/Label-3', fontSize: 18, lineHeight: 24, weights: ['Regular', 'Medium', 'Bold', 'ExtraBold'], ...base },
    ],
  },
  {
    name: 'Body',
    styles: [
      { name: 'Body-1', token: 'Body/Body-1', fontSize: 16, lineHeight: 22, weights: ['Regular', 'Medium', 'Bold'], ...base },
      { name: 'Body-2', token: 'Body/Body-2', fontSize: 14, lineHeight: 20, weights: ['Regular', 'Medium', 'Bold'], ...base },
    ],
  },
  {
    name: 'Caption',
    styles: [
      { name: 'Caption-1', token: 'Caption/Caption-1', fontSize: 12, lineHeight: 16, weights: ['Regular', 'Medium', 'Bold'], ...base },
      { name: 'Caption-2', token: 'Caption/Caption-2', fontSize: 10, lineHeight: 14, weights: ['Regular', 'Medium', 'Bold'], ...base },
      { name: 'Caption-3', token: 'Caption/Caption-3', fontSize: 9, lineHeight: 12, weights: ['Regular', 'Medium', 'Bold'], ...base },
    ],
  },
]

export const textStyles: TextStyle[] = typeGroups.flatMap((g) => g.styles)
