import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import progress from 'rollup-plugin-progress'
import rolluprc from './.rolluprc.json'

export default [
  {
    entry: rolluprc.entryConfig,
    targets: [
      { dest: pkg.module, format: 'es' },
      { dest: pkg.main, format: 'cjs' }
    ],
    plugins: [
      progress({ clearLine: false }),
      babel(rolluprc.babelConfig),
      minify()
    ],
    sourceMap: true,
    external: id => rolluprc.externalConfig.includes(id)
  }
]
