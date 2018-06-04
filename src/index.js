import objectGet from 'object-get'

export default class DesignSystem {
  constructor(system, options) {
    const defaultOptions = {
      fontSizeUnit: undefined,
    }
    this.opts = Object.assign({}, defaultOptions, options)
    this.ds = system
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

  fontSize(size) {
    const output = `${this.get(size, this.ds.type.sizes)}`
    const baseFontSize = parseFloat(this.ds.type.baseFontSize)

    // Don't convert the value if we don't have to
    if (parseUnit(output) === this.opts.fontSizeUnit) {
      return output
    }

    // Convert font-size to the specified unit
    switch (this.opts.fontSizeUnit) {
      case 'rem':
        return pxTo(output, baseFontSize, 'rem')
      case 'em':
        return pxTo(output, baseFontSize, 'em')
      case 'px':
        return toPx(output, baseFontSize)
      default:
        return output
    }
  }

  fs(size) {
    return this.fontSize(size)
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

// Converts px to rem/em
export const pxTo = (value, base = 20, unit = 'rem') =>
  `${parseFloat(value) / base}${unit}`

// Converts rem/em to px
export const toPx = (value, base = 20) => `${parseFloat(value) * base}px`

export const parseUnit = str => {
  str = String(str)
  return str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
}
