// import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [typescript(), resolve(), autoExternal(), commonjs(), terser()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [typescript(), resolve(), autoExternal(), commonjs(), terser()],
  },
]
