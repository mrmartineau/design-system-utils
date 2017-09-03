export const multiply = (initial, multiplier) => {
  return initial * multiplier
}

export const pxTo = (value, base = 20, unit = 'rem') => {
  return `${value / base}${unit}`
}
