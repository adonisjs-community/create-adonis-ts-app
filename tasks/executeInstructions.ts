/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { executeInstructions, logger } from '@adonisjs/sink'

import { TaskFn } from '../src/contracts'
import { packages } from '../src/schematics/packages'

const LOG_MESSAGES: Set<string> = new Set()

/**
 * Executes instructions on the installed packages
 */
const task: TaskFn = async (absPath, application, state) => {
  let instructionsError: Error | null = null
  logger.pauseLogger()

  /**
   * Executing instructions in sequence. Do not convert this block to
   * parallel execution, since two instructions touching the same
   * file may lead to race conditions.
   */
  try {
    for (let pkg of Object.keys(packages[state.boilerplate])) {
      await executeInstructions(pkg, absPath, application)
    }
  } catch (error) {
    instructionsError = error
  }

  /**
   * Print logs and filter out duplicate one's
  */
  logger.resumeLogger((message) => {
    if (LOG_MESSAGES.has(message.message as string) && message.action !== 'fatal') {
      return false
    }

    LOG_MESSAGES.add(message.message as string)
    return true
  })

  /**
   * Handle error
   */
  if (instructionsError) {
    logger.fatal(instructionsError)
    throw instructionsError
  }
}

export default task
