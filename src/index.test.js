import { ds } from '../example/myDesignSystem'
import { ds1 } from './testData/ds1'
import { ds2 } from './testData/ds2'
import { ds3 } from './testData/ds3'

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
  expect(ds.fs(0)).toBe('1rem')
  expect(ds.fs('m')).toBe('1.5rem')
  expect(ds.fs(1)).toBe('1.5rem')
})

test('font-size - ds1', () => {
  expect(ds1.fontSize('base')).toBe('30px')
  expect(ds1.fontSize('base', true)).toBe('30px')
})

test('font-size - ds2', () => {
  expect(ds2.fs('m')).toBe('45px')
  expect(ds2.fs('m', true)).toBe('45px')
})

test('font-size - ds3', () => {
  expect(ds3.fs('m')).toBe('1.5em')
  expect(ds3.fs('m', true)).toBe('45px')
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
