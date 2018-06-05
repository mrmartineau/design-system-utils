// options: fontSizeUnit:px
import DesignSystem from '../index'

const DesignSystem2 = {
  type: {
    baseFontSize: '30px',

    sizes: {
      small: '1em',
      medium: '1.5em',
      large: '2.4em',
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

export default new DesignSystem(DesignSystem2)
