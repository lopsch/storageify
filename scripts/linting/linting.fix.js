'use strict'
import exec from '../common/exec'
import { eslint, baseArgs } from './linting.common'

const args = ['--fix'].concat(baseArgs).filter(Boolean)

exec(eslint, args, 'LINTING')
