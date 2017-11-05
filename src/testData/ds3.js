// options: modular-scale:true, fontSizeUnit:px
import DesignSystem from '../index'

const DesignSystem3 = {
  type: {
    baseFontSize: '30px',

    modularscale: {
      base: 30,
      ratio: 1.5,
    },

    sizes: {
      xs: -2,
      s: -1,
      base: 0, // [default] p, h5, h6
      m: 1, // h4
      l: 2, // h3
      xl: 3, // h2
      xxl: 4, // h1
    },
  },

  colorPalette: {
    blue: {
      base: 'blue',
      dark: 'navyblue',
    },
  },

  breakpoints: {
    s: '400px',
    m: 500,
    l: 800,
  },

  zIndex: {
    low: 10,
    mid: 100,
    high: 1000,
  },

  spacing: {
    scale: [0, 8, 16, 24, 32, 40],
  },
}

export const ds3 = new DesignSystem(DesignSystem3, {
  useModularScale: true,
  fontSizeUnit: 'em',
})
