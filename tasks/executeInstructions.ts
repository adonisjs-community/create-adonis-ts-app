/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { executeInstructions } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'
import { logError } from '../src/logger'

/**
 * Executes instructions on the installed packages
 */
const task: TaskFn = async (absPath, application, state) => {
  try {
    await executeInstructions('@adonisjs/core', absPath, application)
    await executeInstructions('@adonisjs/bodyparser', absPath, application)

    if (state.boilerplate === 'web') {
      await executeInstructions('@adonisjs/view', absPath, application)
      await executeInstructions('@adonisjs/session', absPath, application)
    }
  } catch (error) {
    const stack = error.stack.split('\n')
    logError(stack.shift(), stack)
    throw error
  }
}

export default task
