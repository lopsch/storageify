'use strict'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import exec from '../common/exec'
import { baseArgs, files, mocha, nyc } from './test.common'

console.log(chalk.green.bold('Enabling coverage mode'))

const addArgs = [
  '--reporter',
  'mochawesome',
  '--reporter-options',
  'reportDir=mochawesome,quiet=false,enableCode=false'
]
const args = [mocha, ...baseArgs, ...addArgs, ...files].filter(Boolean)

const covPath = path.resolve('istanbul')
fs.emptydirSync(covPath)

exec(nyc, args, 'TEST')
