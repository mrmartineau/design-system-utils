import color from './color'
import get from './get'
import { multiply as multi, pxTo, toPx } from './calcs'
import ms from 'modularscale-js'

export default class DesignSystem {
  constructor(system, options) {
    const defaultOptions = {
      defaultUnit: 'px',
      useModularScale: true,
      fontSizeUnit: 'rem',
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.designSystem = system
    this.color = color(system.colorPalette)
    this.pxTo = pxTo
    this.toPx = toPx
  }

  multiply(initial, multiplier) {
    let initialVal
    if (typeof initial === 'string') {
      initialVal = parseFloat(this.get(initial))
    } else {
      initialVal = initial
    }
    return multi(initialVal, multiplier)
  }

  get(val) {
    return get(this.designSystem, val)
  }

  bp(bp) {
    return get(this.designSystem.breakpoints, bp)
  }

  z(z) {
    return get(this.designSystem.zIndex, z)
  }

  fontSize(size, toPxl = false) {
    let output
    if (this.options.useModularScale) {
      const value =
        typeof size === 'number'
          ? size
          : get(this.designSystem.type.sizes, size)
      output = ms(value, this.designSystem.type.modularscale)
    } else {
      output = get(this.designSystem.type.sizes, size)
    }

    const untransformedOutput = `${output}px`

    if (toPxl) {
      return untransformedOutput
    }

    switch (this.options.fontSizeUnit) {
      case 'rem':
        return pxTo(
          output,
          parseFloat(this.designSystem.type.baseFontSize),
          'rem'
        )
      case 'em':
        return pxTo(
          output,
          parseFloat(this.designSystem.type.baseFontSize),
          'em'
        )
      default:
        return untransformedOutput
    }
  }

  fs(size, toPxl = false) {
    return this.fontSize(size, toPxl)
  }

  spacing(index = 0) {
    return `${this.designSystem.spacing.scale[index]}px`
  }

  space(index) {
    return this.spacing(index)
  }
}
