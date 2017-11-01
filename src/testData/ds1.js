// options: modular-scale:false, fontSizeUnit:px
import DesignSystem from '../index'

const DesignSystem1 = {
  type: {
    baseFontSize: '30px',

    sizes: {
      xs: 16,
      s: 20,
      base: 30, // [default] p, h5, h6
      m: 36, // h4
      l: 42, // h3
      xl: 50, // h2
      xxl: 58 // h1
    }
  },

  colorPalette: {
    blue: {
      base: 'blue',
      dark: 'navyblue'
    }
  },

  breakpoints: {
    s: 200,
    m: 500,
    l: 800
  },

  zIndex: {
    low: 10,
    mid: 100,
    high: 1000
  },

  spacing: {
    scale: [0, 8, 16, 24, 32, 40]
  }
}

export const ds1 = new DesignSystem(DesignSystem1, {
  useModularScale: false,
  fontSizeUnit: 'px'
})
