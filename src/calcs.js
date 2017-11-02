/**
 * @module multiply
 * @description multiply a given value
 * @author Zander
 * @param {number} initial
 * @param {number} multiplier
 * @return {number}
 * @example: multiply(30, 2)
 */
export const multiply = (initial, multiplier) => {
  return initial * multiplier
}

/**
 * @module pxTo
 * @description convert a pixel value to `rem` or `em`
 * @author Zander
 * @param {number} value
 * @param {number} base
 * @param {string} unit
 * @return {string}
 * @example: pxTo(30, 16, 'em')
 */
export const pxTo = (value, base = 20, unit = 'rem') => {
  return `${value / base}${unit}`
}
