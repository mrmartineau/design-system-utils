import ds1 from './testData/ds1'

// rename to your own method
export const breakpoints = (bp: string): string => ds1.bp(bp)

// export specific values as aliases
export const baseFontSize = ds1.get('type.baseFontSize')
export const brandPrimary = ds1.brand('red')
