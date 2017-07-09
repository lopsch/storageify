'use strict'
import spawn from 'cross-spawn'
import chalk from 'chalk'

export default function exec (cmd, args, desc, error) {
  const { status } = spawn.sync(cmd, args, { stdio: 'inherit' })

  if (status !== 0) {
    console.log(chalk.red.bold(`\n${desc} FAILURE\n`))

    if (typeof error === 'function') {
      error()
    }

    process.exit(status)
  }

  console.log(chalk.green.bold(`\n${desc} SUCCESS\n`))
}
