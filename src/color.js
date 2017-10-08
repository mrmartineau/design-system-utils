/**
 * color
 * @module color
 * @description get a color from your color palette
 * @author Zander
 * Usage: color(colorPalette)('bright', 'lighter')
 */
export default function color(palette) {
  return (hue, value = 'base') => {
    return palette[hue][value]
  }
}
