'use strict'
import path from 'path'
import paths from '../common/paths'

export const eslint = path.resolve('node_modules', '.bin', 'eslint')

export const baseArgs = [
  `${paths.scripts}`,
  `${paths.tests}`,
  `${paths.sources}`
]
