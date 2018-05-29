// options: modular-scale:false, fontSizeUnit:em
import DesignSystem from '../index'

const DesignSystem4 = {
  type: {
    baseFontSize: '30px',

    sizes: {
      xs: '0.5em',
      s: '0.8em',
      base: '1em',
      m: '1.5em',
      l: '2em',
      xl: '2.5em',
      xxl: '4em',
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
    s: 200,
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

export default new DesignSystem(DesignSystem4)
