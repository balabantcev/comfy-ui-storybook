// Tabs tokens — Figma "❖ Comfy UI" / Tabs
//   Horizontal tabs (node 15414:331), -Tab button base (14332:5245), -Tab button underline (14333:10937)

export type TabsVariant = 'segmented' | 'underline'
/** Figma "Color": Brand (brand text on the active tab) | White (outlined, neutral text) */
export type TabsColor = 'brand' | 'white'
export type TabsSize = 36 | 40

export const TABS_VARIANTS: TabsVariant[] = ['segmented', 'underline']
export const TABS_COLORS: TabsColor[] = ['brand', 'white']
export const TABS_SIZES: TabsSize[] = [36, 40]

export interface TabItem {
  value: string | number
  label: string
  /** Leading icon (segmented) */
  icon?: string
  /** Counter after the label (segmented — Figma "Caunter") */
  count?: number | string
  /** Trailing icon (underline — Figma "↳ Instance", e.g. chevron-down) */
  trailingIcon?: string
  disabled?: boolean
  /** id of the panel this tab controls (aria-controls) */
  panelId?: string
}

export interface TabsSizeSpec {
  font: 'body-2' | 'body-1'
  icon: number
  counter: number
  gap: number
}

export const TABS_SIZE_SPECS: Record<TabsSize, TabsSizeSpec> = {
  36: { font: 'body-2', icon: 16, counter: 16, gap: 4 },
  40: { font: 'body-1', icon: 20, counter: 20, gap: 6 },
}
