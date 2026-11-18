#!/usr/bin/env node
// Every component's story meta must name its Figma node: `parameters: { figma: '<node-id>' }`.
// The Storybook toolbar turns it into an "Figma ↗" link (.storybook/manager.ts).
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../src/components')
const missing = []
const nodes = new Map()
for (const comp of readdirSync(dir)) {
  const file = join(dir, comp, `${comp}.stories.ts`)
  if (!existsSync(file)) continue
  const meta = readFileSync(file, 'utf8').match(/const meta = \{([\s\S]*?)\n\}\s*satisfies/)
  const node = meta?.[1].match(/\bfigma:\s*'(\d+:\d+)'/)?.[1]
  if (!node) missing.push(`${comp}/${comp}.stories.ts`)
  else nodes.set(comp, node)
}
if (missing.length) {
  console.error(`check-figma-links: ${missing.length} component(s) without parameters.figma in the story meta:\n  ${missing.join('\n  ')}`)
  process.exit(1)
}
console.log(`check-figma-links: ✓ ${nodes.size} components link to their Figma node.`)
