// Type definitions for design-system-utils
// Project: design-system-utils
// Definitions by: Zander Martineau https://zander.wtf

export default class DesignSystem {
  constructor(system: object, options?: object)

  /*~ multiply a given value */
  multiply(initial: number, multiplier: number): any

  /*~ get a value from the design system object */
  get(val: string, obj?: object): any

  /*~ get a breakpoint value from the design system object */
  bp(bp: string): any

  /*~ get a z-index value from the design system object */
  z(z: string): any

  /*~ get a font-size value from the design system object */
  fontSize(size: string | number, toPxl?: boolean): string

  /*~ get a font-size value from the design system object */
  fs(size: string | number, toPxl?: boolean): string

  /*~ get a spacing value from the design system object */
  spacing(index: number): string

  /*~ get a spacing value from the design system object */
  space(index: number): string

  /*~ converts a `rem` or `em` value to `px` */
  toPx(value: number, base: number): string

  /*~ converts `px` to `rem` or `em` */
  pxTo(value: number, base: number, unit?: string): string

  /*~ get a color from your color palette */
  color(hue: string, value?: string): string

  /*~ get a color from your brand color palette */
  brand(color: string): string

  /*~ the design-system itself */
  designSystem: object
}
