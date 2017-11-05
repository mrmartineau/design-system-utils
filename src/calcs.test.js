import { multiply, pxTo, toPx } from './calcs'

test('multiply', () => {
  expect(multiply(10, 2)).toBe(20)
  expect(multiply(1000, 2)).toBe(2000)
})

test(`pxTo`, () => {
  expect(pxTo(30, 16, 'em')).toBe('1.875em')
  expect(pxTo(30, 16, 'rem')).toBe('1.875rem')
  expect(pxTo(30, 16, 'px')).toBe('1.875px')
})

test(`toPx`, () => {
  expect(toPx('1.875em', 16)).toBe('30px')
  expect(toPx('1.875em')).toBe('37.5px')
  expect(toPx('1.875rem', 16)).toBe('30px')
})
