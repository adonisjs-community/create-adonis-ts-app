/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { executeInstructions } from '@adonisjs/sink'

import { fatal } from '../src/logger'
import { TaskFn } from '../src/contracts'
import { packages } from '../src/boilerplate/packages'

/**
 * Executes instructions on the installed packages
 */
const task: TaskFn = async (absPath, application, state) => {
  try {
    await Promise.all(Object.keys(packages[state.boilerplate]).map((name) => {
      return executeInstructions(name, absPath, application)
    }))
  } catch (error) {
    fatal(error)
    throw error
  }
}

export default task
