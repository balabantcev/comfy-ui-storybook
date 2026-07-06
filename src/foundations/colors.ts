// Color tokens — source of truth synced from Figma "❖ Comfy UI" / Foundations / Colors
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=1023-36350

export type ColorScale = Record<string, string>

export interface ColorGroup {
  name: string
  description?: string
  colors: ColorScale
}

export const base: ColorScale = {
  'base-dark': '#0a0a0a',
  'base-white': '#ffffff',
}

export const gray: ColorScale = {
  'gray-50': '#fafafa',
  'gray-100': '#f5f5f5',
  'gray-200': '#e5e5e5',
  'gray-300': '#d4d4d4',
  'gray-400': '#a3a3a3',
  'gray-500': '#737373',
  'gray-600': '#525252',
  'gray-700': '#404040',
  'gray-800': '#262626',
  'gray-900': '#171717',
  'gray-950': '#0a0a0a',
}

export const brand: ColorScale = {
  'brand-50': '#effdec',
  'brand-100': '#ddf9d7',
  'brand-200': '#bef4b3',
  'brand-300': '#8ae977',
  'brand-400': '#4bd530',
  'brand-500': '#2abd13',
  'brand-600': '#24a210',
  'brand-700': '#1c7d0d',
  'brand-800': '#135308',
  'brand-900': '#0e3c06',
  'brand-950': '#0a2e05',
}

export const error: ColorScale = {
  'error-50': '#fef2f1',
  'error-100': '#fde0de',
  'error-200': '#fbcac6',
  'error-300': '#f8a6a0',
  'error-400': '#f47167',
  'error-500': '#f04438',
  'error-600': '#e41f11',
  'error-700': '#c21b0f',
  'error-800': '#98150b',
  'error-900': '#640e07',
  'error-950': '#4c0a06',
}

export const orange: ColorScale = {
  'orange-50': '#fff2eb',
  'orange-100': '#ffdecc',
  'orange-200': '#ffc7a8',
  'orange-300': '#ffa575',
  'orange-400': '#fc7b36',
  'orange-500': '#fc5e0f',
  'orange-600': '#e84b03',
  'orange-700': '#c94103',
  'orange-800': '#972f02',
  'orange-900': '#6f2001',
  'orange-950': '#561701',
}

export const warning: ColorScale = {
  'warning-50': '#fffcf0',
  'warning-100': '#fff9d6',
  'warning-200': '#fff4b8',
  'warning-300': '#ffed8a',
  'warning-400': '#ffe047',
  'warning-500': '#fad100',
  'warning-600': '#ebbc00',
  'warning-700': '#c79500',
  'warning-800': '#9e7100',
  'warning-900': '#664200',
  'warning-950': '#472e00',
}

export const blue: ColorScale = {
  'blue-50': '#f0f8fe',
  'blue-100': '#ddeefd',
  'blue-200': '#b6dafb',
  'blue-300': '#81bff8',
  'blue-400': '#56a9f6',
  'blue-500': '#3699f4',
  'blue-600': '#0c7fe8',
  'blue-700': '#0b6ac1',
  'blue-800': '#0957a0',
  'blue-900': '#063a6a',
  'blue-950': '#032749',
}

export const violet: ColorScale = {
  'violet-50': '#f5f1fe',
  'violet-100': '#eae2fd',
  'violet-200': '#d2c0fc',
  'violet-300': '#ac8bf8',
  'violet-400': '#9b73f7',
  'violet-500': '#8b5cf6',
  'violet-600': '#7c3aed',
  'violet-700': '#6a26d4',
  'violet-800': '#561fad',
  'violet-900': '#411980',
  'violet-950': '#2c0f61',
}

export const pink: ColorScale = {
  'pink-50': '#f9ecf6',
  'pink-100': '#f4ddee',
  'pink-200': '#e7b6da',
  'pink-300': '#d784c1',
  'pink-400': '#c855aa',
  'pink-500': '#af3a94',
  'pink-600': '#95327e',
  'pink-700': '#862d71',
  'pink-800': '#732661',
  'pink-900': '#581d4b',
  'pink-950': '#45173a',
}

export const warmTaupe: ColorScale = {
  'warm-taupe-50': '#f9f8f6',
  'warm-taupe-100': '#f3f0ec',
  'warm-taupe-200': '#e9e3dd',
  'warm-taupe-300': '#d9cfc4',
  'warm-taupe-400': '#bdad9e',
  'warm-taupe-500': '#907c64',
  'warm-taupe-600': '#715f4b',
  'warm-taupe-700': '#54483b',
  'warm-taupe-800': '#3a3127',
  'warm-taupe-900': '#211c17',
}

export const alphaBlack: ColorScale = {
  'alpha-black-10': '#0a0a0a05',
  'alpha-black-20': '#0a0a0a1a',
  'alpha-black-30': '#0a0a0a2e',
  'alpha-black-40': '#0a0a0a5e',
  'alpha-black-50': '#0a0a0a91',
  'alpha-black-60': '#0a0a0ab5',
  'alpha-black-70': '#0a0a0ac7',
  'alpha-black-80': '#0a0a0ae0',
  'alpha-black-90': '#0a0a0af0',
}

export const alphaWhite: ColorScale = {
  'alpha-white-10': '#ffffff0a',
  'alpha-white-20': '#ffffff1f',
  'alpha-white-30': '#ffffff2e',
  'alpha-white-40': '#ffffff5e',
  'alpha-white-50': '#ffffff91',
  'alpha-white-60': '#ffffffb5',
  'alpha-white-70': '#ffffffc7',
  'alpha-white-80': '#ffffffe0',
  'alpha-white-90': '#fffffff0',
}

export const colorGroups: ColorGroup[] = [
  { name: 'Base', description: 'Foundational black & white.', colors: base },
  { name: 'Gray', description: 'Neutral scale for surfaces, borders and text.', colors: gray },
  { name: 'Brand', description: 'Comfy green — primary brand color.', colors: brand },
  { name: 'Error / Red', description: 'Destructive and error states.', colors: error },
  { name: 'Orange', description: 'Accent orange.', colors: orange },
  { name: 'Warning / Yellow', description: 'Warning and caution states.', colors: warning },
  { name: 'Blue', description: 'Informational blue.', colors: blue },
  { name: 'Purple / Violet', description: 'Decorative violet.', colors: violet },
  { name: 'Magenta / Pink', description: 'Decorative pink.', colors: pink },
  { name: 'Warm Taupe', description: 'Warm neutral utility scale.', colors: warmTaupe },
  { name: 'Alpha Black', description: 'Black with transparency, for overlays on light surfaces.', colors: alphaBlack },
  { name: 'Alpha White', description: 'White with transparency, for overlays on dark surfaces.', colors: alphaWhite },
]
