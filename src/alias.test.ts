import { breakpoints, baseFontSize, brandPrimary } from './alias'

describe('alias examples', () => {
  test('should work', () => {
    expect(breakpoints('m')).toBe('500px')
    expect(brandPrimary).toBe('#e82219')
    expect(baseFontSize).toBe('30px')
  })
})
