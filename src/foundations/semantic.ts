// Semantic color tokens — synced from Figma "❖ Comfy UI" variable collection.
// Each maps to a primitive token (see colors.ts / tokens.css). The generator
// emits them as e.g.  --text-secondary: var(--alpha-black-60);
//
// This is the layer components should consume (text-*, bg-*, border-*, icon-*),
// so a primitive change flows through automatically.

export type SemanticMap = Record<string, string>

export const semanticColors: SemanticMap = {
  // Text
  'text-primary': 'alpha-black-90',
  'text-secondary': 'alpha-black-60',
  'text-tertiary': 'alpha-black-40',
  'text-disabled': 'alpha-black-40',
  'text-primary-onbrand': 'base-white',
  'text-brand-primary': 'brand-500',
  'text-brand-secondary': 'brand-600',
  'text-error': 'error-500',
  'text-error-primary': 'error-600',
  'text-invers': 'alpha-white-90',

  // Background
  'bg-primary': 'base-white',
  'bg-secondary': 'gray-100',
  'bg-tertiary': 'gray-200',
  'bg-overlay': 'alpha-black-60',
  'bg-active': 'alpha-black-10',
  'bg-hover': 'alpha-black-10',
  'bg-disabled-subtle': 'gray-100',
  'bg-invers': 'base-dark',
  'bg-dark-solid': 'base-dark',
  'bg-white-solid': 'base-white',
  'bg-brand-primary': 'brand-500',
  'bg-brand-secondary': 'brand-50',
  'bg-success-tertiary': 'brand-50',
  'bg-error-primary': 'error-500',
  'bg-error-secondary': 'error-50',

  // Border
  'border-primary': 'gray-300',
  'border-secondary': 'gray-200',
  'border-brand': 'brand-500',
  'border-alpha-primary': 'alpha-black-30',
  'border-alpha-secondary': 'alpha-black-20',
  'border-alpha-tertiary': 'alpha-black-10',
  'border-gap': 'base-white',
  'border-error-secondary': 'error-300',

  // Icon
  'icon-primary': 'alpha-black-90',
  'icon-secondary': 'alpha-black-60',
  'icon-tertiary': 'alpha-black-40',
  'icon-disabled': 'alpha-black-40',
  'icon-disabled-subtle': 'alpha-black-30',
  'icon-invers': 'alpha-white-90',
  'icon-white-solid': 'base-white',
  'icon-brand-primary': 'brand-500',
}
