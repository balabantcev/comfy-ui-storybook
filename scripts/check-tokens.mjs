#!/usr/bin/env node
// Compare the repo's token sources with a snapshot of the Figma variables.
//
//   scripts/figma/variables.snapshot.json  ← exported from Figma (scripts/figma/export-variables.figma.js)
//   src/foundations/{colors,scale,typography,semantic}.ts
//
// Matching is by RESOLVED VALUE per mode (aliases followed), never by Figma code syntax — see
// context/figma-token-mapping.md. Exit 1 when a Figma variable is missing in the repo, a repo
// token has no Figma counterpart, or a value differs.  `--json` prints a machine-readable report;
// `--snapshot <file>` checks against another export.

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as colorsMod from '../src/foundations/colors.ts'
import { spacing, radius, opacity } from '../src/foundations/scale.ts'
import { typeGroups, fontWeights, fontFamily } from '../src/foundations/typography.ts'
import { semanticColors } from '../src/foundations/semantic.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const argPath = process.argv[process.argv.indexOf('--snapshot') + 1]
const snapshotPath = process.argv.includes('--snapshot') && argPath ? resolve(argPath) : resolve(root, 'scripts/figma/variables.snapshot.json')
const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'))
const col = (name) => snapshot.collections[name]?.vars ?? {}

// ---- naming: Figma → repo (intentional differences only) ----------------------------------
const GROUPS = {
  Base: 'base', Gray: 'gray', Brand: 'brand', Success: 'success', Orange: 'orange', Purple: 'violet',
  Yellow: 'warning', Red: 'error', Blue: 'blue', Magenta: 'pink', 'Warm Taupe': 'warm-taupe',
  White: 'white', Dark: 'dark',
}
// Figma names that are typos / duplicates, mapped to the repo name we use instead
const RENAMES = {
  'Colors/Copmonents/Krashch/krashch-color': 'krashch',
  // lives in the Orange group but is named like the Warning one
  'Component colors/Utility/Orange/utility-warning-950': 'utility-orange-950',
}
function primitiveName(figmaName) {
  if (RENAMES[figmaName]) return RENAMES[figmaName]
  const m = figmaName.match(/^Colors\/([^/]+)\/(.+)$/)
  if (!m || !GROUPS[m[1]]) return null
  return `${GROUPS[m[1]]}-${m[2].toLowerCase()}`
}
const semanticName = (figmaName) => RENAMES[figmaName] ?? figmaName.split('/').pop()
const camel = (s) => s.charAt(0).toLowerCase() + s.slice(1)

// ---- value normalisation ----------------------------------------------------------------
function normHex(v) {
  let h = String(v).trim().toLowerCase()
  if (/^#[0-9a-f]{3}$/.test(h)) h = '#' + [...h.slice(1)].map((c) => c + c).join('')
  if (/^#[0-9a-f]{8}$/.test(h) && h.endsWith('ff')) h = h.slice(0, 7)
  return h
}
const same = (a, b) => (typeof a === 'number' || typeof b === 'number' ? Number(a) === Number(b) : String(a) === String(b))

// ---- repo side --------------------------------------------------------------------------
const repoPrimitives = Object.fromEntries(colorsMod.colorGroups.flatMap((g) => Object.entries(g.colors)).map(([n, v]) => [n, normHex(v)]))
function resolveRepo(name, mode, seen = new Set()) {
  if (repoPrimitives[name]) return repoPrimitives[name]
  const entry = semanticColors[name]
  if (!entry || seen.has(name)) return undefined
  seen.add(name)
  return resolveRepo(entry[mode], mode, seen)
}

// ---- compare ----------------------------------------------------------------------------
const report = { missing: [], extra: [], mismatch: [] }
const seenRepo = { primitive: new Set(), semantic: new Set(), spacing: new Set(), radius: new Set(), opacity: new Set(), type: new Set() }
const fmt = (vals) => vals.map((v) => (v === undefined ? '∅' : v)).join(' / ')

// Primitives (colors + opacity)
for (const [figmaName, [value]] of Object.entries(col('Primitives'))) {
  const op = figmaName.match(/^Opacity\/(opacity-\d+)$/)
  if (op) {
    seenRepo.opacity.add(op[1])
    if (!(op[1] in opacity)) report.missing.push({ kind: 'opacity', figma: figmaName, repo: op[1], figmaValue: value })
    else if (!same(opacity[op[1]], value)) report.mismatch.push({ kind: 'opacity', figma: figmaName, repo: op[1], figmaValue: value, repoValue: opacity[op[1]] })
    continue
  }
  const name = primitiveName(figmaName)
  if (!name) { report.missing.push({ kind: 'primitive', figma: figmaName, repo: '?', figmaValue: value }); continue }
  seenRepo.primitive.add(name)
  if (!(name in repoPrimitives)) report.missing.push({ kind: 'primitive', figma: figmaName, repo: name, figmaValue: value })
  else if (normHex(value) !== repoPrimitives[name]) report.mismatch.push({ kind: 'primitive', figma: figmaName, repo: name, figmaValue: normHex(value), repoValue: repoPrimitives[name] })
}

// Semantic colors (Light, Dark)
for (const [figmaName, values] of Object.entries(col('Colors'))) {
  const name = semanticName(figmaName)
  seenRepo.semantic.add(name)
  if (!(name in semanticColors)) { report.missing.push({ kind: 'semantic', figma: figmaName, repo: name, figmaValue: fmt(values) }); continue }
  const figmaVals = values.map(normHex)
  const repoVals = [0, 1].map((m) => resolveRepo(name, m))
  if (figmaVals.some((v, i) => v !== repoVals[i]))
    report.mismatch.push({ kind: 'semantic', figma: figmaName, repo: name, figmaValue: fmt(figmaVals), repoValue: fmt(repoVals) })
}

// Spacing / Radius
for (const [kind, figmaVars, repo] of [['spacing', col('Spacing'), spacing], ['radius', col('Radius'), radius]]) {
  for (const [name, [value]] of Object.entries(figmaVars)) {
    seenRepo[kind].add(name)
    if (!(name in repo)) report.missing.push({ kind, figma: name, repo: name, figmaValue: value })
    else if (!same(repo[name], value)) report.mismatch.push({ kind, figma: name, repo: name, figmaValue: value, repoValue: repo[name] })
  }
}

// Typography (Desktop, Mobile)
const typo = col('Typography')
const styles = typeGroups.flatMap((g) => g.styles)
for (const [figmaName, values] of Object.entries(typo)) {
  if (figmaName === 'Family/primary') {
    if (!values.every((v) => v === fontFamily)) report.mismatch.push({ kind: 'type', figma: figmaName, repo: 'fontFamily', figmaValue: fmt(values), repoValue: fontFamily })
    continue
  }
  const w = figmaName.match(/^Weights\/(.+)$/)
  if (w) {
    const key = camel(w[1])
    seenRepo.type.add(`weight:${key}`)
    if (!(key in fontWeights)) report.missing.push({ kind: 'type', figma: figmaName, repo: `fontWeights.${key}`, figmaValue: values[0] })
    else if (!same(fontWeights[key], values[0])) report.mismatch.push({ kind: 'type', figma: figmaName, repo: `fontWeights.${key}`, figmaValue: values[0], repoValue: fontWeights[key] })
    continue
  }
  const m = figmaName.match(/^(.+)\/(fontSize|lineHeight|letterSpacing|fontFamily)$/)
  if (!m) { report.missing.push({ kind: 'type', figma: figmaName, repo: '?', figmaValue: fmt(values) }); continue }
  const [, token, prop] = m
  const style = styles.find((s) => s.token === token)
  seenRepo.type.add(token)
  if (!style) { report.missing.push({ kind: 'type', figma: figmaName, repo: token, figmaValue: fmt(values) }); continue }
  const repoVals =
    prop === 'fontFamily' ? [fontFamily, fontFamily]
      : prop === 'letterSpacing' ? [style.letterSpacing ?? 0, style.mobile?.letterSpacing ?? style.letterSpacing ?? 0]
        : [style[prop], style.mobile?.[prop] ?? style[prop]]
  if (values.some((v, i) => !same(v, repoVals[i])))
    report.mismatch.push({ kind: 'type', figma: figmaName, repo: `${style.name}.${prop}`, figmaValue: fmt(values), repoValue: fmt(repoVals) })
}

// Repo tokens with no Figma counterpart
for (const n of Object.keys(repoPrimitives)) if (!seenRepo.primitive.has(n)) report.extra.push({ kind: 'primitive', repo: n })
for (const n of Object.keys(semanticColors)) if (!seenRepo.semantic.has(n)) report.extra.push({ kind: 'semantic', repo: n })
for (const n of Object.keys(spacing)) if (!seenRepo.spacing.has(n)) report.extra.push({ kind: 'spacing', repo: n })
for (const n of Object.keys(radius)) if (!seenRepo.radius.has(n)) report.extra.push({ kind: 'radius', repo: n })
for (const n of Object.keys(opacity)) if (!seenRepo.opacity.has(n)) report.extra.push({ kind: 'opacity', repo: n })
for (const s of styles) if (!seenRepo.type.has(s.token)) report.extra.push({ kind: 'type', repo: s.token })
for (const k of Object.keys(fontWeights)) if (!seenRepo.type.has(`weight:${k}`)) report.extra.push({ kind: 'type', repo: `fontWeights.${k}` })

// ---- output -----------------------------------------------------------------------------
const total = report.missing.length + report.extra.length + report.mismatch.length
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ snapshot: snapshot.exportedAt, ...report }, null, 2))
} else {
  const counts = Object.fromEntries(Object.entries(snapshot.collections).map(([k, v]) => [k, Object.keys(v.vars).length]))
  console.log(`check-tokens: Figma snapshot ${snapshot.exportedAt} — ${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(', ')}`)
  const section = (title, rows, line) => {
    if (!rows.length) return
    console.log(`\n${title} (${rows.length}):`)
    for (const r of rows) console.log('  ' + line(r))
  }
  section('✗ value differs', report.mismatch, (r) => `[${r.kind}] ${r.repo}  Figma ${r.figmaValue}  ≠  repo ${r.repoValue}   (${r.figma})`)
  section('✗ in Figma, missing in repo', report.missing, (r) => `[${r.kind}] ${r.figma} → ${r.repo}  (${r.figmaValue})`)
  section('✗ in repo, not in Figma', report.extra, (r) => `[${r.kind}] ${r.repo}`)
  console.log(total ? `\n✗ ${total} difference(s). Update the token sources (then pnpm gen:tokens), or refresh the snapshot if Figma is behind.` : '\n✓ tokens match Figma.')
}
process.exit(total ? 1 : 0)
