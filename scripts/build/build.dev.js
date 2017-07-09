'use strict'
import spawn from 'cross-spawn'
import chalk from 'chalk'
import { baseArgs, babel } from './build.common'
import paths from '../common/paths'
import fs from '../common/fs'

console.log(chalk.green.bold('Enabling watch mode'))

fs.prepare(paths.distPath)

const addArgs = ['--watch']
const args = [...baseArgs, ...addArgs].filter(Boolean)

spawn(babel, args, { stdio: 'inherit' })
