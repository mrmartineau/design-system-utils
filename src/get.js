/**
 * get
 * @module get
 * @description get a value from the design system object
 * @author Zander
 * Usage: get(obj, 'bright')
 */

import objectGet from 'object-get'

export default (obj, value) => objectGet(obj, value)
