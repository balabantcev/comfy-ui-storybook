// Payment method tokens — Figma "❖ Comfy UI" / Misc icons / Payment method icon (node 13618:494)
// Logos keep their brand colors; the card (bg-white-solid + border-secondary) is CSS.
const files = import.meta.glob('./methods/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const svg = (slug: string, size: number) => files[`./methods/${slug}-${size}.svg`]

export type PaymentMethodName = 'visa' | 'mastercard' | 'apple-pay' | 'google-pay' | 'liqpay' | 'pay24' | 'cash-on-delivery'
export type PaymentMethodSize = 24 | 32

export const PAYMENT_METHOD_SIZES: PaymentMethodSize[] = [24, 32]

/** Figma artwork per size + display name, in Figma order */
export const PAYMENT_METHODS: Record<PaymentMethodName, { label: string; svg: Record<PaymentMethodSize, string> }> = Object.fromEntries(
  (
    [
      ['visa', 'Visa'],
      ['mastercard', 'Mastercard'],
      ['apple-pay', 'Apple Pay'],
      ['google-pay', 'Google Pay'],
      ['liqpay', 'LiqPay'],
      ['pay24', '24 Pay'],
      ['cash-on-delivery', 'Післяплата'],
    ] as const
  ).map(([slug, label]) => [slug, { label, svg: { 24: svg(slug, 24), 32: svg(slug, 32) } }]),
) as Record<PaymentMethodName, { label: string; svg: Record<PaymentMethodSize, string> }>

export const PAYMENT_METHOD_NAMES = Object.keys(PAYMENT_METHODS) as PaymentMethodName[]
