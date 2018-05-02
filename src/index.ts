import objectGet from 'object-get'
import ms from 'modularscale-js'

interface ds {
  breakpoints?: Object;
  zIndex?: Object;
  type?: Object;
  // type.sizes?: Object;
}

export default class DesignSystem {
  public ds: Object;
  public options: Object;
  public pxTo: Function;
  public toPx: Function;

  constructor(system: Object, options: Object) {

    const defaultOptions = {
      defaultUnit: 'px',
      useModularScale: true,
      fontSizeUnit: 'rem',
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.ds = system
    this.pxTo = (value: number, base: number = 20, unit = 'rem'): string => `${value / base}${unit}`
    this.toPx = (value:number, base = 20): string => `${parseFloat(value) * base}px`
  }

  multiply(initial: number, multiplier: number) {
    let initialVal
    if (typeof initial === 'string') {
      initialVal = parseFloat(this.get(initial))
    } else {
      initialVal = initial
    }
    return initialVal * multiplier
  }

  get(value: string, obj = this.ds): any {
    return objectGet(obj, value)
  }

  bp(bp: string): any {
    return this.get(bp, this.ds.breakpoints)
  }

  z(z: string): any {
    return this.get(z, this.ds.zIndex)
  }

  fontSize(size: string|number, toPxl = false): string {
    let output
    if (this.options.useModularScale) {
      const value =
        typeof size === 'number' ? size : this.get(size, this.ds.type.sizes)
      output = ms(value, this.ds.type.modularscale)
    } else {
      output = this.get(size, this.ds.type.sizes)
    }

    const untransformedOutput:string = `${output}px`

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

  fs(size: string|number, toPxl = false): string {
    return this.fontSize(size, toPxl)
  }

  spacing(index: number): string {
    return `${this.ds.spacing.scale[index]}px`
  }

  space(index: number): string {
    return this.spacing(index)
  }

  color(hue: string, value = 'base'): string {
    return this.ds.colors.colorPalette[hue][value]
  }

  brand(color: string): string {
    return this.get(color, this.ds.colors.brand)
  }
}
