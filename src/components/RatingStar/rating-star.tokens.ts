// Rating star tokens — Figma "❖ Comfy UI" / Misc icons / Rating star (node 12552:45)
// https://www.figma.com/design/60wkPriIjI9zjyAKOq3dja/?node-id=12552-45

export type RatingStarColor = 'orange' | 'yellow'
export const RATING_STAR_COLORS: RatingStarColor[] = ['orange', 'yellow']

/** Figma "Fill" steps (the component accepts any 0–100) */
export const RATING_STAR_FILLS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

/** Star outline in a 20×20 box (Figma "Star bg" / "Star fg" vector) */
export const STAR_PATH =
  'M6.869 6.1168L1.552 6.8876C0.902 7.0199 0.584 7.8172 1.092 8.3101L4.943 12.0593L4.035 17.3551C3.957 18.0142 4.62 18.5618 5.244 18.2334L9.999 15.7334L14.743 18.2334C15.346 18.5109 16.073 18.0511 15.953 17.3551L15.044 12.0593L18.897 8.3093C19.346 7.821 19.134 6.9896 18.435 6.8884L13.118 6.1168L10.742 1.3001C10.442 0.6923 9.546 0.6923 9.247 1.3001L6.869 6.1168Z'

/** Fill of the i-th star (0-based) for a rating `value` — e.g. value 3.7 → 100,100,100,70,0 */
export function starFill(value: number, index: number): number {
  return Math.round(Math.min(1, Math.max(0, value - index)) * 100)
}
