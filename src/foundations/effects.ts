// Effect tokens — synced from Figma "❖ Comfy UI" / Foundations / Effect styles
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=1030-33573
//
// Shadow layers use the fixed Dark alpha primitives (see colors.ts):
//   dark-50 = 2 %, dark-100 = 4 %, dark-200 = 10 %, dark-300 = 18 %

export interface Elevation {
  /** Token name in the app */
  name: string
  /** Token path in Figma */
  token: string
  /** Ready-to-use CSS box-shadow value (light theme) */
  boxShadow: string
}

// Reference the design tokens (src/foundations/tokens.css) instead of raw rgba.
// Shadow colors are bound to fixed primitives in Figma (Colors/Dark/N), so elevations do
// NOT invert in the dark theme. Layers mirror Figma "Elevations/E*" exactly — note the
// 4 % layer (dark-100), which an earlier sync mapped to 2 % by mistake.
const d = (step: number) => `var(--dark-${step})`

export const elevations: Elevation[] = [
  {
    name: 'elevation-50',
    token: 'Elevations/E50',
    boxShadow: `0px 0px 0.5px 0px ${d(200)}, 0px 1px 3px 0px ${d(100)}`,
  },
  {
    name: 'elevation-100',
    token: 'Elevations/E100',
    boxShadow: `0px 0px 0.5px 0px ${d(200)}, 0px 1px 3px 0px ${d(200)}`,
  },
  {
    name: 'elevation-200',
    token: 'Elevations/E200',
    boxShadow: `0px 0px 0.5px 0px ${d(200)}, 0px 3px 8px 0px ${d(200)}, 0px 1px 3px 0px ${d(100)}`,
  },
  {
    name: 'elevation-300',
    token: 'Elevations/E300',
    boxShadow: `0px 0px 0.5px 0px ${d(200)}, 0px 5px 12px 0px ${d(200)}, 0px 1px 3px 0px ${d(100)}`,
  },
  {
    name: 'elevation-400',
    token: 'Elevations/E400',
    boxShadow: `0px 0px 0.5px 0px ${d(200)}, 0px 10px 16px 0px ${d(200)}, 0px 2px 5px 0px ${d(100)}`,
  },
  {
    name: 'elevation-500',
    token: 'Elevations/E500',
    boxShadow: `0px 3px 12px 0px ${d(50)}, 0px 10px 24px 0px ${d(300)}, 0px 2px 5px 0px ${d(100)}`,
  },
]

export interface FocusRing {
  name: string
  token: string
  boxShadow: string
}

// Figma "Focus ring/*" effect styles — a 2px spread bound to theme-aware utility colors.
export const focusRings: FocusRing[] = [
  { name: 'focus-ring-success', token: 'Focus ring/focus-ring-success', boxShadow: '0px 0px 0px 2px var(--utility-brand-500)' },
  { name: 'focus-ring-danger', token: 'Focus ring/focus-ring-danger', boxShadow: '0px 0px 0px 2px var(--utility-error-500)' },
]

export interface Blur {
  name: string
  token: string
  /** Figma background-blur radius */
  figmaRadius: number
  /** Equivalent CSS blur in px (Figma radius / 2) */
  blur: number
  /** Ready-to-use CSS backdrop-filter value */
  backdropFilter: string
}

export const blurs: Blur[] = [
  { name: 'blur-100', token: 'Blur/B100', figmaRadius: 8, blur: 4, backdropFilter: 'blur(4px)' },
  { name: 'blur-200', token: 'Blur/B200', figmaRadius: 16, blur: 8, backdropFilter: 'blur(8px)' },
  { name: 'blur-300', token: 'Blur/B300', figmaRadius: 24, blur: 12, backdropFilter: 'blur(12px)' },
  { name: 'blur-400', token: 'Blur/B400', figmaRadius: 32, blur: 16, backdropFilter: 'blur(16px)' },
  { name: 'blur-500', token: 'Blur/B500', figmaRadius: 40, blur: 20, backdropFilter: 'blur(20px)' },
]

// Tinted "glass" surfaces designed to sit on top of a blurred background.
export const blurSurfaces = {
  'bg-blur-white': 'rgba(255, 255, 255, 0.37)',
  'bg-blur-dark': 'rgba(10, 10, 10, 0.37)',
} as const

// Note: each Blur style also carries a NOISE effect (radius 4) in Figma — a subtle
// grain overlay that has no direct CSS backdrop-filter equivalent and is omitted here.
