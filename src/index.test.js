import ds from '../example/myDesignSystem'
import ds1 from './testData/ds1'
import ds2 from './testData/ds2'
import ds3 from './testData/ds3'
import ds4 from './testData/ds4'

test('breakpoints', () => {
  expect(ds.bp('s')).toBe(300)
  expect(ds1.bp('s')).toBe(200)
  expect(ds2.bp('s')).toBe('400px')
})

test('z-index', () => {
  expect(ds.z('low')).toBe(10)
  expect(ds.z('mid')).toBe(100)
})

test('spacing', () => {
  expect(ds.spacing()).toBe('0px')
  expect(ds.spacing(3)).toBe('24px')
  expect(ds.space(2)).toBe('16px')
})

test('font-size - ds', () => {
  expect(ds.fs('base')).toBe('1rem')
  expect(ds.fs('m')).toBe('1.5rem')
})

test('font-size - ds1', () => {
  expect(ds1.fontSize('base')).toBe('30px')
  expect(ds1.fontSize('l')).toBe('42px')
})

test('font-size - ds2', () => {
  expect(ds2.fs('m')).toBe('45px')
  expect(ds2.fs('l')).toBe('67.5px')
})

test('font-size - ds3', () => {
  expect(ds3.fs('m')).toBe('1.5rem')
  expect(ds3.fs('l')).toBe('2.25rem')
})

test('font-size - ds4', () => {
  expect(ds4.fs('m')).toBe('1.5em')
  expect(ds4.fs('l')).toBe('2em')
})

test('get', () => {
  expect(ds.get('type.baseFontSize')).toBe('20px')
  expect(ds1.get('type.baseFontSize')).toBe('30px')
  expect(ds2.get('type.baseFontSize')).toBe('30px')
})

test('ds.multiply', () => {
  expect(ds.multiply(20, 2)).toBe(40)
  expect(ds.multiply('type.baseFontSize', 2)).toBe(40)
  expect(ds.multiply('spacing.baseline', 2)).toBe(40)
})

test(`pxTo`, () => {
  expect(ds.pxTo(30, 16, 'em')).toBe('1.875em')
  expect(ds.pxTo(30, 16, 'rem')).toBe('1.875rem')
  expect(ds.pxTo(30, 16)).toBe('1.875rem')
  expect(ds.pxTo(30)).toBe('1.5rem')
  expect(ds.pxTo(30, 16, 'px')).toBe('1.875px')
})

test(`toPx`, () => {
  expect(ds.toPx('1.875em', 16)).toBe('30px')
  expect(ds.toPx('1.875em')).toBe('37.5px')
  expect(ds.toPx('1.875rem', 16)).toBe('30px')
})

test('ds.brand', () => {
  expect(ds.brand('orange')).toBe('#ff9500')
  expect(ds.brand('teal')).toBe('#1aa5c8')
})

test('ds.color', () => {
  expect(ds.color('primary')).toBe('#181830')
  expect(ds.color('secondary', 'light')).toBe('#fea04c')
  expect(ds.color('text', 'dark')).toBeUndefined()
})
