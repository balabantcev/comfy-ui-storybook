// Alert / Toast tokens — Figma "❖ Comfy UI" / Alert & Toast
// Alert (node 12231:4230), Toast (node 15423:13721)
import type { FeaturedIconColor } from '../FeaturedIcon/featured-icon.tokens'
import type { ButtonIntent } from '../Button/button.tokens'

export type AlertVariant = 'default' | 'success' | 'warning' | 'error'
/** Figma "Variant icon": a 20px glyph or a 32px Outline Featured icon */
export type AlertIconStyle = 'default' | 'featured'

export const ALERT_VARIANTS: AlertVariant[] = ['default', 'success', 'warning', 'error']
export const ALERT_ICON_STYLES: AlertIconStyle[] = ['default', 'featured']

/** Featured icon color per alert color */
export const ALERT_FEATURED_COLOR: Record<AlertVariant, FeaturedIconColor> = {
  default: 'gray',
  success: 'success',
  warning: 'warning',
  error: 'error',
}

/** Accent (right) action: Link brand / Link destructive; Warning is Link gray recolored in CSS */
export const ALERT_ACTION_INTENT: Record<AlertVariant, ButtonIntent> = {
  default: 'brand',
  success: 'brand',
  warning: 'gray',
  error: 'destructive',
}
