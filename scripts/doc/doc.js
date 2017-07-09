'use strict'
import fs from 'fs-extra'
import path from 'path'
import exec from '../common/exec'

const jsdoc = path.resolve('node_modules', '.bin', 'jsdoc')

const args = ['-d', 'jsdoc', '-r', 'src'].filter(Boolean)

const docPath = path.resolve('jsdoc')
fs.emptydirSync(docPath)

exec(jsdoc, args, 'DOC')
