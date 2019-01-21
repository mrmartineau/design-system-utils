import { get } from '@ngard/tiny-get'
import {
  System,
  SystemOptions,
  SystemBreakpoints,
  SystemZIndex,
  SystemFontSizes,
  SystemSpacing,
  SystemScale,
  SystemColorPalette,
  SystemBrandPalette,
  SystemType,
  SystemOptionalKey,
} from './types'

export {
  System,
  SystemOptions,
  SystemBreakpoints,
  SystemZIndex,
  SystemFontSizes,
  SystemSpacing,
  SystemScale,
  SystemColorPalette,
  SystemBrandPalette,
  SystemType,
  SystemOptionalKey,
}

/*~ converts a `rem` or `em` value to `px` */
export const pxTo = (
  value: any,
  base: number = 16,
  unit: string = 'rem'
): string => `${parseFloat(value) / base}${unit}`

/*~ converts `px` to `rem` or `em` */
export const toPx = (value: any, base: number = 16): string =>
  `${parseFloat(value) * base}px`

/*~ parses a number and unit string, and returns the unit used */
export const parseUnit = (str: string): string =>
  str.trim().match(/[\d.\-+]*\s*(.*)/)[1] || ''

// Errors
const errorIntro = 'design-system-utils:'
const MissingParent = (msg: string): string =>
  `${errorIntro} Values missing at: ${msg} within your design tokens config`

const MissingKey = (
  location: string,
  val: string | number,
  val2?: string
): string => {
  const value = val2 === undefined ? val : `${val}.${val2}`
  return `${errorIntro} There is a missing value at this key: ${location}.${value}`
}

export default class DesignSystem<T extends System, K extends SystemOptions> {
  private opts: K
  private ds: T

  constructor(system: T, options?: K) {
    this.opts = Object.assign(
      {},
      {
        fontSizeUnit: undefined,
      },
      options
    )
    this.ds = system
  }

  /*~ multiply a given value */
  public multiply(initial: any, multiplier: number): number {
    const initialVal =
      typeof initial === 'string' ? parseFloat(this.get(initial)) : initial

    return initialVal * multiplier
  }

  /*~ get a value from the design system object */
  public get(value: string, obj: any = this.ds): any {
    return get(obj, value, undefined)
  }

  /*~ get a breakpoint value from the design system object */
  public bp(breakpoint: string): string {
    const location = 'breakpoints'
    if (this.get(location, this.ds) === undefined) {
      throw new Error(MissingParent(location))
    }

    const value: string | undefined = this.get(breakpoint, this.ds.breakpoints)

    if (value === undefined) {
      throw new Error(MissingKey(location, breakpoint))
    }

    return value
  }

  /*~ get a z-index value from the design system object */
  public z(z: string): string {
    const location = 'zIndex'
    if (this.get(location, this.ds) === undefined) {
      throw new Error(MissingParent(location))
    }

    const value: string | undefined = this.get(z, this.ds.zIndex)

    if (value === undefined) {
      throw new Error(MissingKey(location, z))
    }

    return value
  }

  /*~ get a font-size value from the design system object */
  public fontSize(size: string): string {
    const location = 'type.sizes'
    this.parentCheck(location)

    let baseFontSize
    if (typeof this.ds.type.baseFontSize === 'string') {
      baseFontSize = parseFloat(this.ds.type.baseFontSize)
    }

    const value: string | undefined = this.get(size, this.ds.type.sizes)

    if (value === undefined) {
      throw new Error(MissingKey(location, size))
    }

    // Don't convert the value if we don't have to
    if (parseUnit(value) === this.opts.fontSizeUnit) {
      return value
    }

    // Convert font-size to the specified unit
    switch (this.opts.fontSizeUnit) {
      case 'rem':
        return pxTo(value, baseFontSize, 'rem')
      case 'em':
        return pxTo(value, baseFontSize, 'em')
      case 'px':
        return toPx(value, baseFontSize)
      default:
        return value
    }
  }

  /*~ get a font-size value from the design system object */
  public fs(size: string): string {
    return this.fontSize(size)
  }

  /*~ get a spacing value from the design system object */
  public spacing(val: string | number): string {
    const location = 'spacing.scale'
    this.parentCheck(location)

    const value: number | string | undefined = this.get(
      `${val}`,
      this.ds.spacing.scale
    )

    if (value === undefined) {
      throw new Error(MissingKey(location, val))
    }

    if (typeof value === 'string') {
      return value
    }

    return `${value}px`
  }

  /*~ get a spacing value from the design system object */
  public space(val: string | number): string {
    return this.spacing(val)
  }

  /*~ get a color from your color palette */
  public color(hue: string, variant: string = 'base'): string {
    const location = 'colors.colorPalette'
    if (
      this.get('colors', this.ds) === undefined &&
      this.get(location, this.ds) === undefined
    ) {
      throw new Error(MissingParent(location))
    }

    const value: string | undefined = this.ds.colors.colorPalette[hue][variant]

    if (value === undefined) {
      throw new Error(MissingKey(location, hue, variant))
    }

    return value
  }

  /*~ get a color from your brand color palette */
  public brand(color: string): string {
    const location = 'colors.brand'
    this.parentCheck(location)

    const value: string | undefined = this.get(color, this.ds.colors.brand)

    if (value === undefined) {
      throw new Error(MissingKey(location, color))
    }

    return value
  }

  private parentCheck(loc: string) {
    const locPt1 = loc.split('.')
    if (
      this.get(locPt1[0], this.ds) === undefined &&
      this.get(loc, this.ds) === undefined
    ) {
      throw new Error(MissingParent(loc))
    }
  }
}
