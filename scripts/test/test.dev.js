'use strict'
import spawn from 'cross-spawn'
import chalk from 'chalk'
import { baseArgs, files, mocha } from './test.common'

console.log(chalk.green.bold('Enabling watch mode'))

const addArgs =
  process.env.REPORTER === 'min'
    ? ['--reporter', 'min', '--watch']
    : ['--watch']
const args = [...baseArgs, ...addArgs, ...files].filter(Boolean)

spawn(mocha, args, { stdio: 'inherit' })
