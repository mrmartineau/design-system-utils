/**
 * getColor
 * @module getColor
 * @description get a color from your color palette
 * @author Zander
 * Usage: getColor(colorPalette)('bright', 'lighter')
 */
export default function getColor(palette) {
  return (hue, value = 'base') => {
    return palette[hue][value]
  }
}
