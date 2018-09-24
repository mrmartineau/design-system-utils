// Type definitions for design-system-utils
// Project: design-system-utils
// Definitions by: Zander Martineau https://zander.wtf

export interface Options {
  fontSizeUnit?: string
}

export interface System {
  [prop: string]: any
  type?: {
    baseFontSize?: string | number
    sizes?: {
      [size: string]: string | number
    }

    fontFamily?: {
      [family: string]: string
    }
    fontFamilyBase?: string
    fontFamilyHeadings?: string

    lineHeight?: {
      [name: string]: string | number
    }

    fontWeight?: {
      [name: string]: string | number
    }
  }
  breakpoints?: {
    [name: string]: string | number
  }
  colors?: {
    brand?: {
      [name: string]: string
    }
    colorPalette?: {
      [name: string]: {
        base: string
        [variant: string]: string
      }
    }
  }
  zIndex?: {
    [name: string]: number
  }
  spacing?: {
    scale:
      | Array<number | string>
      | {
          [size: string]: string | number
        }
  }
}

export default class DesignSystem<T extends System> {
  constructor(system: T, options?: Options)

  /*~ multiply a given value */
  multiply(initial: any, multiplier: number): number

  /*~ get a value from the design system object */
  get(val: string, obj?: object): any

  /*~ get a breakpoint value from the design system object */
  bp(bp: keyof T['breakpoints']): T['breakpoints']

  /*~ get a z-index value from the design system object */
  z(z: keyof T['zIndex']): keyof T['zIndex']

  /*~ get a font-size value from the design system object */
  fontSize(
    size: keyof NonNullable<T['type']>['sizes']
  ): NonNullable<T['type']>['sizes']

  /*~ get a font-size value from the design system object */
  fs(
    size: keyof NonNullable<T['type']>['sizes']
  ): NonNullable<T['type']>['sizes']

  /*~ get a spacing value from the design system object */
  spacing(index?: number): NonNullable<T['spacing']>['scale']

  /*~ get a spacing value from the design system object */
  space(index?: number): NonNullable<T['spacing']>['scale']

  /*~ get a color from your color palette */
  color<
    Hue extends keyof NonNullable<T['colors']>['colorPalette'],
    Val extends keyof NonNullable<T['colors']>['colorPalette'][Hue]
  >(hue: Hue, value?: Val): NonNullable<T['colors']>['colorPalette'][Hue]

  /*~ get a color from your brand color palette */
  brand(
    color: keyof NonNullable<T['colors']>['brand']
  ): NonNullable<T['colors']>['brand']

  /*~ the design-system itself */
  designSystem: T
}

/*~ converts a `rem` or `em` value to `px` */
export function toPx(value: any, base?: number): string

/*~ converts `px` to `rem` or `em` */
export function pxTo(value: any, base?: number, unit?: string): string

/*~ parses a number and unit string, and returns the unit used */
export function parseUnit(value: string): string
