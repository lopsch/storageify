'use strict'
import path from 'path'

const distPath = path.join(process.cwd(), 'dist')
const libPath = path.join(process.cwd(), 'lib')

export const paths = {
  distPath,
  libPath,
  tests: 'test/**/*.js',
  scripts: 'scripts/**/*.js',
  sources: 'src/**/*.js'
}

export default paths
