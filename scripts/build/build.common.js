'use strict'
import path from 'path'

export const babel = path.resolve('node_modules', '.bin', 'babel')

export const baseArgs = ['src', '--out-dir', 'dist']
