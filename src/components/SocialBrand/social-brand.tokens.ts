// Social brand tokens — Figma "❖ Comfy UI" / Misc icons / Social brand (node 13133:1436)
// Brand marks keep their own colors (like Flag); Figma-bound parts use tokens inside the SVGs.
import apple from './brands/apple.svg?raw'
import facebook from './brands/facebook.svg?raw'
import google from './brands/google.svg?raw'
import instagram from './brands/instagram.svg?raw'
import meestPost from './brands/meest-post.svg?raw'
import messenger from './brands/messenger.svg?raw'
import novaPost from './brands/nova-post.svg?raw'
import ipost from './brands/ipost.svg?raw'
import telegram from './brands/telegram.svg?raw'
import ukrPost from './brands/ukr-post.svg?raw'
import viber from './brands/viber.svg?raw'

export type SocialBrandName =
  | 'apple'
  | 'google'
  | 'instagram'
  | 'nova-post'
  | 'ukr-post'
  | 'meest-post'
  | 'ipost'
  | 'messenger'
  | 'telegram'
  | 'viber'
  | 'facebook'

/** Raw <svg> markup + display name, in Figma order */
export const SOCIAL_BRANDS: Record<SocialBrandName, { svg: string; label: string }> = {
  apple: { svg: apple, label: 'Apple' },
  google: { svg: google, label: 'Google' },
  instagram: { svg: instagram, label: 'Instagram' },
  'nova-post': { svg: novaPost, label: 'Нова пошта' },
  'ukr-post': { svg: ukrPost, label: 'Укрпошта' },
  'meest-post': { svg: meestPost, label: 'Meest' },
  ipost: { svg: ipost, label: 'iPost' },
  messenger: { svg: messenger, label: 'Messenger' },
  telegram: { svg: telegram, label: 'Telegram' },
  viber: { svg: viber, label: 'Viber' },
  facebook: { svg: facebook, label: 'Facebook' },
}

export const SOCIAL_BRAND_NAMES = Object.keys(SOCIAL_BRANDS) as SocialBrandName[]
