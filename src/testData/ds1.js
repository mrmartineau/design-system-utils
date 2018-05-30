// options: modular-scale:false, fontSizeUnit:px
import DesignSystem from '../index'

const DesignSystem1 = {
  type: {
    baseFontSize: '30px',

    sizes: {
      xs: '16px',
      s: '20px',
      base: '30px',
      m: '36px',
      l: '42px',
      xl: '50px',
      xxl: '58px',
    },
  },

  colors: {
    colorPalette: {
      text: {
        base: '#212B35',
        light: '#454F5B',
        lighter: '#637381',
      },

      primary: {
        base: '#181830',
        light: '#292952',
        dark: '#0d0d19',
      },

      secondary: {
        base: '#fe7c08',
        light: '#fea04c',
        dark: '#d26401',
      },
    },

    brand: {
      red: '#e82219',
      deeporange: '#ff7200',
      orange: '#ff9500',
      green: '#c4d000',
      teal: '#1aa5c8',
      navy: '#0052da',
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
    baseline: 20,
  },
}

export default new DesignSystem(DesignSystem1)
