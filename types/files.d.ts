declare module '*package.json' {
  export const main: string
  export const module: string
}

declare module '*.json' {
  const value: any
  export default value
}
