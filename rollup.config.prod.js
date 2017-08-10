import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import visualizer from 'rollup-plugin-visualizer'

const isCov = process.env.BABEL_ENV === 'coverage'

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
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'storageify',
    plugins: [
      progress({ clearLine: false }),
      resolve(),
      commonjs(),
      babel(babelConfig),
      !isCov && visualizer({ filename: './stats/stats.umd.html' })
    ],
    sourceMap: true
  },
  {
    entry: 'src/index.js',
    external: ['xstream'],
    dest: pkg.module,
    format: 'es',
    plugins: [
      progress({ clearLine: false }),
      babel(babelConfig),
      !isCov && visualizer({ filename: './stats/stats.esm.html' })
    ],
    sourceMap: true
  },
  {
    entry: 'src/index.js',
    external: ['xstream'],
    dest: pkg.main,
    format: 'cjs',
    plugins: [
      progress({ clearLine: false }),
      babel(babelConfig),
      !isCov && visualizer({ filename: './stats/stats.cjs.html' })
    ],
    sourceMap: true
  }
]
