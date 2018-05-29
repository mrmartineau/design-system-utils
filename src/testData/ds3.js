// options: modular-scale:true, fontSizeUnit:rem
import DesignSystem from '../index'
import ms from 'modularscale-js'

const modularscale = {
  base: [30],
  ratio: 1.5,
}

const DesignSystem3 = {
  type: {
    baseFontSize: '30px',

    sizes: {
      xs: `${ms(-2, modularscale)}px`,
      s: `${ms(-1, modularscale)}px`,
      base: `${ms(0, modularscale)}px`, // [default] p, h5, h6
      m: `${ms(1, modularscale)}px`, // h4
      l: `${ms(2, modularscale)}px`, // h3
      xl: `${ms(3, modularscale)}px`, // h2
      xxl: `${ms(4, modularscale)}px`, // h1
    },
  },

  colors: {
    colorPalette: {
      blue: {
        base: 'blue',
        dark: 'navyblue',
      },
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

export default new DesignSystem(DesignSystem3, {
  fontSizeUnit: 'rem',
})
