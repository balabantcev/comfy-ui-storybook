// Icon registry — SVGs synced from Figma "❖ Comfy UI" / Components / Icons
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=1025-31781
//
// Each neutral icon uses `fill="currentColor"`, so it inherits the surrounding
// text color and can be sized via font-size / width / height. A few brand icons
// (suffixed `-color`) keep their original multi-color fills.

// Eagerly import every SVG in this folder as a raw string.
const modules = import.meta.glob('./**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface IconEntry {
  /** Unique icon name, e.g. "arrow-up" */
  name: string
  /** Category folder, e.g. "arrows" */
  category: string
  /** Raw <svg> markup */
  svg: string
  /** Whether the icon keeps its own colors (true) or follows currentColor */
  colored: boolean
}

function toEntry(path: string, svg: string): IconEntry {
  // path like "./arrows/arrow-up.svg"
  const [, category, file] = path.split('/')
  const name = file.replace(/\.svg$/, '')
  return { name, category, svg, colored: !svg.includes('currentColor') }
}

export const icons: IconEntry[] = Object.entries(modules)
  .map(([p, svg]) => toEntry(p, svg))
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))

export const iconsByName: Record<string, IconEntry> = Object.fromEntries(
  icons.map((i) => [i.name, i]),
)

export const iconNames: string[] = icons.map((i) => i.name)

export const categories: string[] = [...new Set(icons.map((i) => i.category))].sort()

export function getIcon(name: string): IconEntry | undefined {
  return iconsByName[name]
}
