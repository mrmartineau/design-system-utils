import { multiply, pxTo } from './calcs'

test('multiply', () => {
  expect(multiply(10, 2)).toBe(20)
  expect(multiply(1000, 2)).toBe(2000)
})

test(`pxTo`, () => {
  expect(pxTo(30, 16, 'em')).toBe('1.875em')
  expect(pxTo(30, 16, 'rem')).toBe('1.875rem')
  expect(pxTo(30, 16)).toBe('1.875rem')
  expect(pxTo(30)).toBe('1.5rem')
  expect(pxTo(30, 16, 'px')).toBe('1.875px')
})
