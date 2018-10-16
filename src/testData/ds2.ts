// options: fontSizeUnit:px
import DesignSystem, { System, SystemOptions } from '../index'

const DesignSystem2: System = {
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
    scale: {
      s: '10rem',
      m: '100rem',
      l: '1000rem',
    },
  },
}

export default new DesignSystem<System, SystemOptions>(DesignSystem2)
