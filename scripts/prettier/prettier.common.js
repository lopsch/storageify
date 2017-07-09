'use strict'
import path from 'path'
import paths from '../common/paths'

export const baseArgs = [
  '--print-width',
  80,
  '--tab-width',
  2,
  '--no-semi',
  '--single-quote',
  '--trailing-comma',
  'none',
  '--jsx-bracket-same-line',
  '--parser',
  'babylon',
  `${paths.scripts}`,
  `${paths.tests}`,
  `${paths.sources}`
]

export const prettier = path.resolve('node_modules', '.bin', 'prettier')
