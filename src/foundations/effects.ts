// Effect tokens — synced from Figma "❖ Comfy UI" / Foundations / Effect styles
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=1030-33573
//
// Shadow colors are bound to the alpha-black scale (see colors.ts):
//   alpha-black-10 = rgba(10,10,10,0.02)
//   alpha-black-20 = rgba(10,10,10,0.10)
//   alpha-black-30 = rgba(10,10,10,0.18)

export interface Elevation {
  /** Token name in the app */
  name: string
  /** Token path in Figma */
  token: string
  /** Ready-to-use CSS box-shadow value (light theme) */
  boxShadow: string
}

// Reference the design tokens (src/foundations/tokens.css) instead of raw rgba.
const a10 = 'var(--alpha-black-10)' // rgba(10,10,10,0.02)
const a20 = 'var(--alpha-black-20)' // rgba(10,10,10,0.10)
const a30 = 'var(--alpha-black-30)' // rgba(10,10,10,0.18)

export const elevations: Elevation[] = [
  {
    name: 'elevation-50',
    token: 'Elevations/E50',
    boxShadow: `0px 0px 0.5px 0px ${a20}, 0px 1px 3px 0px ${a10}`,
  },
  {
    name: 'elevation-100',
    token: 'Elevations/E100',
    boxShadow: `0px 0px 0.5px 0px ${a20}, 0px 1px 3px 0px ${a20}`,
  },
  {
    name: 'elevation-200',
    token: 'Elevations/E200',
    boxShadow: `0px 0px 0.5px 0px ${a20}, 0px 3px 8px 0px ${a20}, 0px 1px 3px 0px ${a10}`,
  },
  {
    name: 'elevation-300',
    token: 'Elevations/E300',
    boxShadow: `0px 0px 0.5px 0px ${a20}, 0px 5px 12px 0px ${a20}, 0px 1px 3px 0px ${a10}`,
  },
  {
    name: 'elevation-400',
    token: 'Elevations/E400',
    boxShadow: `0px 0px 0.5px 0px ${a20}, 0px 10px 16px 0px ${a20}, 0px 2px 5px 0px ${a10}`,
  },
  {
    name: 'elevation-500',
    token: 'Elevations/E500',
    boxShadow: `0px 3px 12px 0px ${a10}, 0px 10px 24px 0px ${a30}, 0px 2px 5px 0px ${a10}`,
  },
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
