'use strict'
import chalk from 'chalk'
import { baseArgs, babel } from './build.common'
import paths from '../common/paths'
import exec from '../common/exec'
import fs from '../common/fs'

console.log(chalk.green.bold('Enabling build mode'))

fs.prepare(paths.distPath)

const addArgs = ['--source-maps']
const args = [...baseArgs, ...addArgs].filter(Boolean)

exec(babel, args, 'BUILD', () => fs.clean(paths.distPath))
