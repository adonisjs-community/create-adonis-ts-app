/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import execa from 'execa'
import { TaskFn } from '../../src/Contracts'

/**
 * Configure tests
 */
const task: TaskFn = async (_, logger, { absPath, debug }) => {
  let spinner: ReturnType<typeof logger.await> | undefined
  if (!debug) {
    spinner = logger.await('Configuring tests')
  }

  try {
    await execa('node', ['ace', 'configure', 'tests'], {
      cwd: absPath,
      ...(debug ? { stdio: 'inherit' } : {}),
    })
    spinner && spinner.stop()
  } catch (error) {
    spinner && spinner.stop()
    throw error
  }
}

export default task
