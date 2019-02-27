export interface SystemOptions {
  fontSizeUnit?: string | undefined
}

export interface SystemOptionalKey {
  [prop: string]: string | number
}

export interface SystemFontSizes {
  [size: string]: string | number
}

export interface SystemType {
  baseFontSize?: string | number
  sizes?: SystemFontSizes
}

export interface SystemBreakpoints {
  [name: string]: string | number
}

export interface SystemColorPalette {
  [name: string]: {
    [variant: string]: string | object
  }
}

export interface SystemBrandPalette {
  [color: string]: string
}

interface SystemColor {
  colorPalette?: SystemColorPalette
  brand?: SystemBrandPalette
}

// export type TSystemColor = SystemOptionalKey | SystemColor

export interface SystemZIndex {
  [name: string]: number
}

export type SystemScale =
  | number[]
  | string[]
  | {
      [size: string]: string | number
    }

export interface SystemSpacing {
  scale?: SystemScale
}

export interface System {
  [prop: string]: any
  type?: SystemType
  breakpoints?: SystemBreakpoints
  colors?: SystemColor
  zIndex?: SystemZIndex
  spacing?: SystemSpacing
}
