import DesignSystem from '../src'
import myDesignSystem from './myDesignSystem'

const ds = new DesignSystem(myDesignSystem)

// Colors
console.log('ds:getColor', ds.getColor('primary'))
console.log('ds:getColor', ds.getColor('primary'))


// Typography
console.log('ds:getFontSize', ds.getFontSize('xl'))
console.log('ds:base font size', ds.getValue('type.baseFontSize'))

// Calcs
console.log('ds:multiply', ds.multiply(10, 2))

// Breakpoints
console.log('ds:getBreakpoint', ds.getBreakpoint('m'))

// Z-index
console.log('ds:getZIndex', ds.getZIndex('low'))


console.log(
  'ds:multiply spacing',
  ds.multiply(ds.getValue('spacing.baseline'), 105),
)
