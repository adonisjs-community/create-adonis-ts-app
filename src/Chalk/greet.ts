/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { instructions, logger } from '@adonisjs/sink'
import { CliState } from '../contracts'
import { packageManager } from '../Helpers'

/**
 * Greet post creation
 */
export const greet = ({ baseName, skipInstall }: CliState) => {
  console.log('')

  const instructionList = instructions()
    .heading(logger.colors.dim('Run following commands to get started'))
    .add(logger.colors.cyan(`cd ${baseName}`))

  /**
   * Display instructions for installing and configuring
   * dependencies only when `skipInstall` is true
   */
  if (skipInstall) {
    instructionList.add(logger.colors.cyan(`${packageManager} install`))
  }

  instructionList.add(logger.colors.cyan('node ace serve --watch')).render()

  console.log('')
}
