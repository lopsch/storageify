'use strict'
import * as _fs from 'fs-extra'
import chalk from 'chalk'

function prepare (destination) {
  console.log(chalk.yellow.bold(`\nPreparing ${destination}\n`))
  _fs.emptydirSync(destination)
}

function clean (destination) {
  _fs.emptydirSync(destination)
  console.log(chalk.yellow.bold(`\nCleaned ${destination}\n`))
}

function copy (source, destination) {
  _fs.copySync(source, destination)
  console.log(chalk.yellow.bold(`\nCopied from ${source} to ${destination}\n`))
}

export const fs = { prepare, clean, copy }

export default fs
