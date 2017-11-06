/**
 * @module multiply
 * @description multiply a given value
 * @author Zander
 * @param {number} initial
 * @param {number} multiplier
 * @return {number}
 * @example: multiply(30, 2)
 */
export const multiply = (initial, multiplier) => initial * multiplier

/**
 * @module pxTo
 * @description converts `px` to `rem` or `em`
 * @author Zander
 * @param {number} value
 * @param {number} base
 * @param {string} unit
 * @return {string}
 * @example: pxTo(30, 16, 'em')
 */
export const pxTo = (value, base = 20, unit = 'rem') => `${value / base}${unit}`

/**
 * @module toPx
 * @description converts a `rem` or `em` value to `px`
 * @author Zander
 * @param {string} value
 * @param {number} base
 * @return {string}
 * @example: toPx(30, 16)
 */
export const toPx = (value, base = 20) => `${parseFloat(value) * base}px`
