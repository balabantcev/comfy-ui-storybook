// Logo registry — brand assets synced from Figma "❖ Comfy UI" / Logos
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=1083-118533

const modules = import.meta.glob('./*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type LogoKind = 'wordmark' | 'mark'

export interface LogoAsset {
  /** e.g. "wordmark-green" */
  name: string
  kind: LogoKind
  /** wordmark: green | white | mono · mark: modern | default */
  variant: string
  svg: string
}

export const logos: LogoAsset[] = Object.entries(modules)
  .map(([path, svg]) => {
    const file = path.split('/').pop()!.replace(/\.svg$/, '')
    const [kind, variant] = file.split(/-(.+)/)
    return { name: file, kind: kind as LogoKind, variant, svg }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export const DEFAULT_VARIANT: Record<LogoKind, string> = {
  wordmark: 'green',
  mark: 'modern',
}

export function getLogo(kind: LogoKind, variant?: string): LogoAsset | undefined {
  const v = variant ?? DEFAULT_VARIANT[kind]
  return logos.find((l) => l.kind === kind && l.variant === v)
}
