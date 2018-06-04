import ds1 from './testData/ds1'
import ds2 from './testData/ds2'
import DesignSystem from './index'

import { pxTo, toPx, parseUnit } from './index'

test('breakpoints', () => {
  expect(ds1.bp('s')).toBe(200)
  expect(ds2.bp('s')).toBe('400px')
})

test('z-index', () => {
  expect(ds1.z('low')).toBe(10)
  expect(ds2.z('mid')).toBe(100)
})

test('spacing', () => {
  expect(ds1.spacing()).toBe('0px')
  expect(ds1.spacing(3)).toBe('24px')
  expect(ds1.space(2)).toBe('16px')
})

test('font-size - ds1 - px', () => {
  expect(ds1.fontSize('base')).toBe('30px')
  expect(ds1.fontSize('l')).toBe('42px')
})

test('font-size - ds2 - em', () => {
  expect(ds2.fs('medium')).toBe('1.5em')
  expect(ds2.fs('large')).toBe('2.4em')
})

test('font-size - rem', () => {
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
})

test('font-size - px to rem', () => {
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

test('font-size - px to em', () => {
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

test('font-size - rem to px', () => {
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

test('font-size - px to px', () => {
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

test('get', () => {
  expect(ds1.get('type.baseFontSize')).toBe('30px')
  expect(ds2.get('type.baseFontSize')).toBe('30px')
})

test('ds.multiply', () => {
  expect(ds1.multiply(20, 2)).toBe(40)
  expect(ds1.multiply('type.baseFontSize', 2)).toBe(60)
  expect(ds1.multiply('spacing.baseline', 2)).toBe(40)
})

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
})
test('ds.brand', () => {
  expect(ds1.brand('orange')).toBe('#ff9500')
  expect(ds1.brand('teal')).toBe('#1aa5c8')
})

test('ds.color', () => {
  expect(ds1.color('primary')).toBe('#181830')
  expect(ds1.color('secondary', 'light')).toBe('#fea04c')
  expect(ds1.color('text', 'dark')).toBeUndefined()
})
