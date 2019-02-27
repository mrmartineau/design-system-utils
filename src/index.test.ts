import ds1 from './testData/ds1'
import ds2 from './testData/ds2'
import DesignSystem from './index'

import { pxTo, toPx, parseUnit } from './index'
describe('design-system-utils methods', () => {
  test('get', () => {
    expect(ds1.get('type.baseFontSize')).toBe('30px')
    expect(ds1.get('foo')).toBeUndefined()
    expect(ds1.get('foo.bar')).toBeUndefined()
    expect(ds2.get('type.baseFontSize')).toBe('30px')
  })

  test('multiply', () => {
    expect(ds1.multiply(20, 2)).toBe(40)
    expect(ds1.multiply('type.baseFontSize', 2)).toBe(60)
    expect(ds1.multiply('spacing.baseline', 2)).toBe(40)
  })

  test('breakpoints', () => {
    expect(ds1.bp('s')).toBe(200)
    expect(ds1.bp('m')).toBe('500px')
    expect(ds2.bp('s')).toBe('400px')

    // Errors
    expect(() => ds1.bp('xxxxl')).toThrow(
      'design-system-utils: There is a missing value at this key: breakpoints.xxxxl'
    )

    const ds = new DesignSystem({})
    expect(() => ds.bp('m')).toThrow(
      'design-system-utils: Values missing at: breakpoints within your design tokens config'
    )
  })

  test('z-index', () => {
    expect(ds1.z('low')).toBe(10)
    expect(ds2.z('mid')).toBe(100)

    // Errors
    expect(() => ds1.z('xxxxl')).toThrow(
      'design-system-utils: There is a missing value at this key: zIndex.xxxxl'
    )

    const ds = new DesignSystem({})
    expect(() => ds.z('m')).toThrow(
      'design-system-utils: Values missing at: zIndex within your design tokens config'
    )
  })

  describe('spacing', () => {
    test('when using an array', () => {
      expect(ds1.spacing(0)).toBe('0px')
      expect(ds1.space(2)).toBe('16px')
      expect(ds1.spacing(3)).toBe('24px')
    })

    test('when using an object', () => {
      expect(ds2.space('s')).toBe('10rem')
      expect(ds2.space('m')).toBe('100rem')
      expect(ds2.space('l')).toBe('1000rem')
    })

    // Errors
    test('should return errors', () => {
      expect(() => ds1.spacing('xxxxl')).toThrow(
        'design-system-utils: There is a missing value at this key: spacing.scale.xxxxl'
      )
      expect(() => ds1.spacing(10)).toThrow(
        'design-system-utils: There is a missing value at this key: spacing.scale.10'
      )

      const ds = new DesignSystem({})
      expect(() => ds.spacing('m')).toThrow(
        'design-system-utils: Values missing at: spacing.scale within your design tokens config'
      )
      expect(() => ds.space('m')).toThrow(
        'design-system-utils: Values missing at: spacing.scale within your design tokens config'
      )
      expect(() => ds.space(2)).toThrow(
        'design-system-utils: Values missing at: spacing.scale within your design tokens config'
      )
    })
  })

  describe('fontSize', () => {
    test('fontSize - ds1 - px', () => {
      expect(ds1.fontSize('base')).toBe('30px')
      expect(ds1.fontSize('l')).toBe('42px')

      // Errors
      expect(() => ds1.fontSize('xxxxl')).toThrow(
        'design-system-utils: There is a missing value at this key: type.sizes.xxxxl'
      )

      const ds = new DesignSystem({})
      expect(() => ds.fontSize('l')).toThrow(
        'design-system-utils: Values missing at: type.sizes within your design tokens config'
      )
    })

    test('fontSize - ds2 - em', () => {
      expect(ds2.fs('medium')).toBe('1.5em')
      expect(ds2.fs('large')).toBe('2.4em')

      // Errors
      expect(() => ds2.fontSize('xxxxl')).toThrow(
        'design-system-utils: There is a missing value at this key: type.sizes.xxxxl'
      )
    })

    test('fontSize - rem', () => {
      const system = {
        type: {
          baseFontSize: '20px',

          sizes: {
            s: '1rem',
            m: '2rem',
            l: '3rem',
          },
        },
      }

      const ds = new DesignSystem(system)
      expect(ds.fontSize('m')).toBe('2rem')
      expect(ds.fontSize('l')).toBe('3rem')

      // Errors
      expect(() => ds.fontSize('l')).not.toThrow()
    })

    test('fontSize - px to rem', () => {
      const system = {
        type: {
          baseFontSize: '20px',

          sizes: {
            s: '20px',
            m: '25px',
            l: '40px',
          },
        },
      }

      const ds = new DesignSystem(system, {
        fontSizeUnit: 'rem',
      })
      expect(ds.fs('m')).toBe('1.25rem')
      expect(ds.fs('l')).toBe('2rem')
    })

    test('fontSize - px to em', () => {
      const system = {
        type: {
          baseFontSize: '20px',

          sizes: {
            s: '20px',
            m: '25px',
            l: '40px',
          },
        },
      }

      const ds = new DesignSystem(system, {
        fontSizeUnit: 'em',
      })
      expect(ds.fs('m')).toBe('1.25em')
      expect(ds.fs('l')).toBe('2em')
    })

    test('fontSize - rem to px', () => {
      const system = {
        type: {
          baseFontSize: '20px',

          sizes: {
            s: '1rem',
            m: '2rem',
            l: '3rem',
          },
        },
      }

      const ds = new DesignSystem(system, {
        fontSizeUnit: 'px',
      })
      expect(ds.fs('m')).toBe('40px')
      expect(ds.fs('l')).toBe('60px')
    })

    test('fontSize - px to px', () => {
      const system = {
        type: {
          baseFontSize: '20px',

          sizes: {
            s: '20px',
            m: '25px',
            l: '40px',
          },
        },
      }

      const ds = new DesignSystem(system, {
        fontSizeUnit: 'px',
      })
      expect(ds.fs('m')).toBe('25px')
      expect(ds.fs('l')).toBe('40px')
    })
  })

  test('brand', () => {
    expect(ds1.brand('orange')).toBe('#ff9500')
    expect(ds1.brand('teal')).toBe('#1aa5c8')

    // Errors
    expect(() => ds1.brand('text')).toThrow(
      'design-system-utils: There is a missing value at this key: colors.brand.text'
    )
    const ds = new DesignSystem({})
    expect(() => ds.brand('text')).toThrow(
      'design-system-utils: Values missing at: colors.brand within your design tokens config'
    )
  })

  test('color', () => {
    expect(ds1.color('primary')).toBe('#181830')
    expect(ds1.color('secondary', 'light')).toBe('#fea04c')
    expect(ds1.color('v2.secondary.light')).toBe('#fea04c')
    expect(ds1.color('v2.secondary.deep.nested.light')).toBe('#fea04c')

    // Errors
    expect(() => ds1.color('text', 'dark')).toThrow(
      'design-system-utils: There is a missing value at this key: colors.colorPalette.text.dark'
    )
    const ds = new DesignSystem({})
    expect(() => ds.color('text')).toThrow(
      'design-system-utils: Values missing at: colors.colorPalette within your design tokens config'
    )
  })
})

describe('design-system-utils helpers', () => {
  test(`pxTo`, () => {
    expect(pxTo('30px', 16, 'em')).toBe('1.875em')
    expect(pxTo('30px', 16, 'rem')).toBe('1.875rem')
    expect(pxTo('30px', 20)).toBe('1.5rem')
    expect(pxTo('30px')).toBe('1.875rem')
  })

  test(`toPx`, () => {
    expect(toPx('1.875em', 16)).toBe('30px')
    expect(toPx('1.875em')).toBe('30px')
    expect(toPx('1.875rem', 16)).toBe('30px')
  })

  test(`parseUnit`, () => {
    expect(parseUnit('1.875em')).toBe('em')
    expect(parseUnit('1.875rem')).toBe('rem')
    expect(parseUnit('1.875  rem')).toBe('rem')
    expect(parseUnit('18px')).toBe('px')
    expect(parseUnit('18 px')).toBe('px')
    expect(parseUnit('18 px ')).toBe('px')
    expect(parseUnit(' 18 px')).toBe('px')
    expect(parseUnit(' 18 px ')).toBe('px')
    expect(parseUnit('  18 px ')).toBe('px')
  })
})
