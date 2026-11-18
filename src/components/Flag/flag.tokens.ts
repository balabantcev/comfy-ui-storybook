// Flag tokens — Figma "❖ Comfy UI" / Misc icons / Flags (node 11288:1811).
import ua from './flags/ua.svg?raw'
import en from './flags/en.svg?raw'

export type FlagCode = 'UA' | 'EN'

/** Raw <svg> markup per country; flags keep their own colors. */
export const FLAGS: Record<FlagCode, string> = { UA: ua, EN: en }

export const FLAG_CODES = Object.keys(FLAGS) as FlagCode[]
