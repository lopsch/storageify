import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

const babelConfig = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: ['es2015-rollup'],
  plugins: ['transform-object-rest-spread'],
  env: { production: { plugins: ['istanbul'] } }
}

// TODO:
// - prettier
// - eslint
// - resolve module

export default [
  {
    entry: 'src/index.js',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'storageify',
    plugins: [resolve(), commonjs(), babel(babelConfig)]
  },
  {
    entry: 'src/index.js',
    external: ['xstream'],
    targets: [
      { dest: pkg.module, format: 'es' },
      { dest: pkg.main, format: 'cjs' }
    ],
    plugins: [babel(babelConfig)]
  }
]
