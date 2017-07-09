'use strict'
import exec from '../common/exec'
import { baseArgs, prettier } from './prettier.common'

const args = ['--list-different'].concat(baseArgs).filter(Boolean)

exec(prettier, args, 'PRETTIER')
