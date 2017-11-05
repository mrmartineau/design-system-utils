/**
 * color
 * @module color
 * @description get a color from your color palette
 * @author Zander
 * @example: color(colorPalette)('bright', 'lighter')
 * @param {object} palette
 * @return {string}
 */
export default function color(palette) {
  return (hue, value = 'base') => {
    return palette[hue][value]
  }
}
