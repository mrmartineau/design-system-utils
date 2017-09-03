/**
 * getValue
 * @module getValue
 * @description get a value from the design system object
 * @author Zander
 * Usage: getValue(obj, 'bright')
 */

import objectGet from 'object-get'

export default function getValue(obj, value) {
  return objectGet(obj, value)
}
