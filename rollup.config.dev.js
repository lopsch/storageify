import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import eslint from 'rollup-plugin-eslint'
import rolluprc from './.rolluprc.json'

export default [
  {
    input: rolluprc.entryConfig,
    output: [{ file: pkg.main, format: 'cjs', sourcemap: false }],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig)
    ],
    external: id => rolluprc.externalConfig.includes(id)
  }
]
