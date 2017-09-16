import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import progress from 'rollup-plugin-progress'
import eslint from 'rollup-plugin-eslint'
import rolluprc from './.rolluprc.json'

export default [
  {
    input: rolluprc.entryConfig,
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'storageify',
        sourcemap: true,
        globals: { xstream: 'xs' }
      }
    ],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig),
      resolve(),
      commonjs()
    ],
    external: id => rolluprc.externalConfig.includes(id)
  },
  {
    input: rolluprc.entryConfig,
    output: [
      {
        file: pkg.min,
        format: 'umd',
        name: 'storageify',
        sourcemap: true,
        globals: { xstream: 'xs' }
      }
    ],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig),
      resolve(),
      commonjs(),
      minify({ comments: false, removeConsole: true, removeDebugger: true })
    ],
    external: id => rolluprc.externalConfig.includes(id)
  },
  {
    input: rolluprc.entryConfig,
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true }
    ],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig)
    ],
    external: id => rolluprc.externalConfig.includes(id)
  }
]
