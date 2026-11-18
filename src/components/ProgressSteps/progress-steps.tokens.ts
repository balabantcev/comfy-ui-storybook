// Progress steps tokens — Figma "❖ Comfy UI" / Progress steps
//   -Step icon base (15766:3872), -Step base (15766:3897), Progress steps (15766:4297),
//   Progress steps-Only vertical (15766:4388), -Minimal icons (15766:4211), -Connected (15766:4138)

export type StepStatus = 'incomplete' | 'current' | 'complete'
/** Figma "Type": Icon (check) | Number | Featured icon | Line */
export type ProgressStepsType = 'icon' | 'number' | 'featured' | 'line'
export type ProgressStepsSize = 's' | 'm'
/** Desktop = horizontal (Icon top …), Mobile / "Only vertical" = vertical (Icon left …) */
export type ProgressStepsLayout = 'auto' | 'horizontal' | 'vertical'
/** default = steps with text; minimal = "Крок X з N" + icons; connected = icons joined by lines */
export type ProgressStepsVariant = 'default' | 'minimal' | 'connected'

export const PROGRESS_STEPS_TYPES: ProgressStepsType[] = ['icon', 'number', 'featured', 'line']
export const PROGRESS_STEPS_SIZES: ProgressStepsSize[] = ['s', 'm']
export const PROGRESS_STEPS_VARIANTS: ProgressStepsVariant[] = ['default', 'minimal', 'connected']

export interface ProgressStep {
  title: string
  description?: string
  /** Featured icon glyph (type="featured") */
  icon?: string
  /** Override the status derived from `current` */
  status?: StepStatus
}

export interface StepSizeSpec {
  /** -Step icon base: 24 | 32 */
  icon: 24 | 32
  /** Featured icon: 40 | 48 */
  featured: 40 | 48
  font: 'body-2' | 'body-1'
  /** gap inside a step (icon ↔ text) */
  gap: number
  /** vertical layout: content padding top / bottom */
  padTop: number
  padBottom: number
  /** vertical connector: gap below the icon (= bottom padding of the rail), per type */
  railGap: { icon: number; number: number; featured: number }
}

export const STEP_SIZES: Record<ProgressStepsSize, StepSizeSpec> = {
  s: { icon: 24, featured: 40, font: 'body-2', gap: 12, padTop: 2, padBottom: 24, railGap: { icon: 4, number: 6, featured: 4 } },
  m: { icon: 32, featured: 48, font: 'body-1', gap: 16, padTop: 4, padBottom: 32, railGap: { icon: 6, number: 8, featured: 4 } },
}

export function stepStatus(index: number, current: number, own?: StepStatus): StepStatus {
  if (own) return own
  return index < current ? 'complete' : index === current ? 'current' : 'incomplete'
}
