import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import eslint from 'rollup-plugin-eslint'

const babelConfig = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: ['es2015-rollup'],
  plugins: ['transform-object-rest-spread'],
  env: { coverage: { plugins: ['istanbul'] } }
}

export default [
  {
    entry: 'src/index.js',
    external: ['xstream'],
    dest: pkg.module,
    format: 'es',
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(babelConfig)
    ],
    sourceMap: false
  }
]
