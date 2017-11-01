import color from './color'
import colorPalette from '../example/colorPalette'
import { ds } from '../example/myDesignSystem'

test('color', () => {
  expect(color(colorPalette)('primary')).toBe('#181830')
  expect(color(colorPalette)('secondary', 'light')).toBe('#fea04c')
  expect(color(colorPalette)('text', 'dark')).toBeUndefined()
})

test('ds.color', () => {
  expect(ds.color('primary')).toBe('#181830')
  expect(ds.color('secondary', 'light')).toBe('#fea04c')
  expect(ds.color('text', 'dark')).toBeUndefined()
})
