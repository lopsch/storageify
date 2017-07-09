'use strict'
import exec from '../common/exec'
import { baseArgs, prettier } from './prettier.common'

const args = ['--write'].concat(baseArgs).filter(Boolean)

exec(prettier, args, 'PRETTIER')
