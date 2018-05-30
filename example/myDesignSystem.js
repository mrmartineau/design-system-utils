import colorPalette from './colorPalette'
import DesignSystem from '../src'
import ms from 'modularscale-js'

const modularscale = {
  base: 20,
  ratio: 1.5,
}

const fontFamily = {
  system:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"',
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  mono: 'Menlo, Monaco, "Courier New", monospace',
}

const transitions = {
  duration: '300ms',
  timing: 'cubic-bezier(0.77, 0, 0.175, 1)',
}

const palette = colorPalette

export const myDesignSystem = {
  type: {
    baseFontSize: '20px',

    sizes: {
      xs: `${ms(-2, modularscale)}px`,
      s: `${ms(-1, modularscale)}px`,
      base: `${ms(0, modularscale)}px`,
      m: `${ms(1, modularscale)}px`,
      l: `${ms(2, modularscale)}px`,
      xl: `${ms(3, modularscale)}px`,
      xxl: `${ms(4, modularscale)}px`,
    },

    fontFamily,
    fontFamilyBase: fontFamily.system,
    fontFamilyHeadings: fontFamily.mono,

    lineHeight: {
      headings: 1.1,
    },

    fontWeight: {
      normal: 300, // Useful to set here if using anything other than `normal`
      bold: 'bold', // Useful to set here when bold webfonts come as 400 font-weight.
      headings: 'bold', // instead of browser default, bold
    },
  },

  colors: {
    colorPalette: palette,

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
    s: 300,
    m: 500,
    l: 800,
  },

  zIndex: {
    low: 10,
    mid: 100,
    high: 1000,
  },

  spacing: {
    baseline: 20,
    padding: '0.3em',
    scale: [0, 8, 16, 24, 32, 40],
  },

  layout: {
    gutter: 20,
    maxWidth: 1200,
    grid: {
      columnCount: 12,
    },
  },

  transition: {
    default: {
      duration: transitions.duration,
      timing: transitions.timing,
      transition: `all ${transitions.duration} ${transitions.timing}`,
    },
  },

  borderRadius: '0.3em',
}

export default new DesignSystem(myDesignSystem, {
  fontSizeUnit: 'rem',
})
