import objectGet from 'object-get'
import ms from 'modularscale-js'

export default class DesignSystem {
  constructor(system, options) {
    const defaultOptions = {
      defaultUnit: 'px',
      useModularScale: true,
      fontSizeUnit: 'rem',
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.ds = system
    this.pxTo = (value, base = 20, unit = 'rem') => `${value / base}${unit}`
    this.toPx = (value, base = 20) => `${parseFloat(value) * base}px`
  }

  multiply(initial, multiplier) {
    let initialVal
    if (typeof initial === 'string') {
      initialVal = parseFloat(this.get(initial))
    } else {
      initialVal = initial
    }
    return initialVal * multiplier
  }

  get(value, obj = this.ds) {
    return objectGet(obj, value)
  }

  bp(bp) {
    return this.get(bp, this.ds.breakpoints)
  }

  z(z) {
    return this.get(z, this.ds.zIndex)
  }

  fontSize(size, toPxl = false) {
    let output
    if (this.options.useModularScale) {
      const value =
        typeof size === 'number' ? size : this.get(size, this.ds.type.sizes)
      output = ms(value, this.ds.type.modularscale)
    } else {
      output = this.get(size, this.ds.type.sizes)
    }

    const untransformedOutput = `${output}px`

    if (toPxl) {
      return untransformedOutput
    }

    switch (this.options.fontSizeUnit) {
      case 'rem':
        return this.pxTo(output, parseFloat(this.ds.type.baseFontSize), 'rem')
      case 'em':
        return this.pxTo(output, parseFloat(this.ds.type.baseFontSize), 'em')
      default:
        return untransformedOutput
    }
  }

  fs(size, toPxl = false) {
    return this.fontSize(size, toPxl)
  }

  spacing(index = 0) {
    return `${this.ds.spacing.scale[index]}px`
  }

  space(index) {
    return this.spacing(index)
  }

  color(hue, value = 'base') {
    return this.ds.colors.colorPalette[hue][value]
  }

  brand(color) {
    return this.get(color, this.ds.colors.brand)
  }
}
