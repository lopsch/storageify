'use strict'
import path from 'path'
import paths from '../common/paths'

export const files = [paths.tests]

export const baseArgs = ['--colors', '--require', 'babel-register']

export const mocha = path.resolve('node_modules', '.bin', 'mocha')

export const nyc = path.resolve('node_modules', '.bin', 'nyc')
