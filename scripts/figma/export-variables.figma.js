// Figma plugin-API snippet: export every local variable of "❖ Comfy UI" as a compact snapshot.
// Run it through the Figma MCP (`use_figma`, read-only) or in Figma's plugin console; save the
// returned JSON as scripts/figma/variables.snapshot.json, then run `pnpm check:tokens`.
//
// Shape: { exportedAt, collections: { <collection>: { modes: [..], vars: { <figma name>: [value per mode] } } } }
//   COLOR → resolved "#rrggbb" / "#rrggbbaa" (aliases followed), FLOAT → number, STRING → string.

const hex = (c) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0')
  const a = c.a === undefined || c.a >= 0.999 ? '' : h(c.a)
  return `#${h(c.r)}${h(c.g)}${h(c.b)}${a}`
}
const byId = new Map()
for (const v of await figma.variables.getLocalVariablesAsync()) byId.set(v.id, v)
const collections = await figma.variables.getLocalVariableCollectionsAsync()
const modeOf = new Map(collections.map((c) => [c.id, c.defaultModeId]))

// follow aliases; an alias into another collection resolves in that collection's default mode
async function resolve(variable, modeId, depth = 0) {
  let value = variable.valuesByMode[modeId]
  if (value === undefined) value = variable.valuesByMode[modeOf.get(variable.variableCollectionId)]
  if (value && value.type === 'VARIABLE_ALIAS') {
    const target = byId.get(value.id) ?? (await figma.variables.getVariableByIdAsync(value.id))
    if (!target || depth > 10) return null
    const targetMode = target.variableCollectionId === variable.variableCollectionId ? modeId : modeOf.get(target.variableCollectionId)
    return resolve(target, targetMode, depth + 1)
  }
  return variable.resolvedType === 'COLOR' ? hex(value) : value
}

const out = { exportedAt: new Date().toISOString(), collections: {} }
for (const c of collections) {
  const vars = {}
  for (const id of c.variableIds) {
    const v = byId.get(id)
    vars[v.name] = await Promise.all(c.modes.map((m) => resolve(v, m.modeId)))
  }
  out.collections[c.name] = { modes: c.modes.map((m) => m.name), vars }
}
return JSON.stringify(out)
