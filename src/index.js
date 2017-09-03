import getColor from './getColor'
import getValue from './getValue'
import { multiply, pxTo } from './calcs'
import ms from 'modularscale-js'

export default class DesignSystem {
  constructor(system) {
    this.designSystem = system
    this.getColor = getColor(system.colorPalette)
    this.multiply = multiply
    this.pxTo = pxTo
  }

  getValue(val) {
    return getValue(this.designSystem, val)
  }

  getBreakpoint(bp) {
    return getValue(this.designSystem.breakpoints, bp)
  }

  getZIndex(z) {
    return getValue(this.designSystem.zIndex, z)
  }

  getFontSize(size) {
    const value = getValue(this.designSystem.type.sizes, size)
    let output
    if (this.designSystem.settings.useModularScale) {
      output = ms(value, this.designSystem.type.modularscale)
    } else {
      output = value
    }

    switch (this.designSystem.settings.fontSizeUnit) {
      case 'rem':
        return pxTo(output, this.designSystem.type.baseFontSize, 'rem')
      case 'em':
        return pxTo(output, this.designSystem.type.baseFontSize, 'em')
      default:
        return `${output}px`
    }
  }
}
