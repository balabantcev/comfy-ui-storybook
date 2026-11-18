// Spacing, radius & opacity scales — synced from Figma "❖ Comfy UI" variable collections
// "Spacing" (formerly "Grid"), "Radius" and Primitives → "Opacity".
// The generator emits  --padding-N: Npx;  --radius-N: Npx;  --opacity-N: 0.N;

export const spacing: Record<string, number> = {
  'padding-0': 0,
  'padding-2': 2,
  'padding-4': 4,
  'padding-6': 6,
  'padding-8': 8,
  'padding-10': 10,
  'padding-12': 12,
  'padding-14': 14,
  'padding-16': 16,
  'padding-20': 20,
  'padding-24': 24,
  'padding-28': 28,
  'padding-32': 32,
  'padding-36': 36,
  'padding-40': 40,
  'padding-44': 44,
  'padding-48': 48,
  'padding-56': 56,
  'padding-64': 64,
  'padding-80': 80,
  'padding-96': 96,
  'padding-128': 128,
  'padding-160': 160,
}

export const radius: Record<string, number> = {
  'radius-0': 0,
  'radius-2': 2,
  'radius-4': 4,
  'radius-6': 6,
  'radius-8': 8,
  'radius-10': 10,
  'radius-12': 12,
  'radius-16': 16,
  'radius-24': 24,
  'radius-32': 32,
  'radius-40': 40,
  'radius-48': 48,
  'radius-full': 999,
}

// Figma stores opacity as a percent (0–100); CSS needs 0–1, the generator divides by 100.
export const opacity: Record<string, number> = {
  'opacity-0': 0,
  'opacity-10': 10,
  'opacity-20': 20,
  'opacity-30': 30,
  'opacity-40': 40,
  'opacity-50': 50,
  'opacity-60': 60,
  'opacity-70': 70,
  'opacity-80': 80,
  'opacity-90': 90,
  'opacity-100': 100,
}
