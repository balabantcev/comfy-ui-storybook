// Badge price tokens — Figma "❖ Comfy UI" / Badge / Badge price (node 13796:1729)

export type BadgePriceSize = 16 | 20 | 24
/** Figma "% or ₴": False → %, True → ₴ */
export type BadgePriceUnit = '%' | '₴'

export const BADGE_PRICE_SIZES: BadgePriceSize[] = [16, 20, 24]
export const BADGE_PRICE_UNITS: BadgePriceUnit[] = ['%', '₴']

/** Outer padding (top / sides); the text frame adds 2px on each side */
export const BADGE_PRICE_PADDING: Record<BadgePriceSize, { y: number; x: number }> = {
  16: { y: 0, x: 2 },
  20: { y: 2, x: 4 },
  24: { y: 4, x: 6 },
}

/** "-4 444" — Ukrainian digit grouping, a plain minus like the Figma sample */
export function formatPriceValue(value: number | string): string {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 2 }).format(value).replace('−', '-')
}
