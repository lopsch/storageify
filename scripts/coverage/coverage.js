'use strict'
import path from 'path'
import exec from '../common/exec'

const nyc = path.resolve('node_modules', '.bin', 'nyc')
const covLinesThresh = 0
const covFuncsThresh = 0
const covBranThresh = 0
const covStateThresh = 0

const covArgs = [
  '--lines',
  covLinesThresh,
  '--functions',
  covFuncsThresh,
  '--branches',
  covBranThresh,
  '--statements',
  covStateThresh
]

const args = ['check-coverage', ...covArgs].filter(Boolean)

exec(nyc, args, 'COVERAGE')
