/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import execa from 'execa'
import { TaskFn } from '../../src/Contracts'

/**
 * Generate manifest file by running `node ace generate:manifest` file
 */
const task: TaskFn = async (_, __, { absPath, debug }) => {
  /**
   * Generating ace-manifest file is a secondary action and errors
   * can be ignored
   */
  try {
    await execa('node', ['ace', 'generate:manifest'], {
      cwd: absPath,
      ...(debug ? { stdio: 'inherit' } : {}),
    })
  } catch {}
}

export default task
