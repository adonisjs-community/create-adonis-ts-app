/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import getops from 'getopts'
import { isAbsolute, join } from 'path'
import { isEmptyDir } from '@adonisjs/sink'
import { Application } from '@poppinss/application'
import { ensureDirSync, removeSync } from 'fs-extra'

import { tasks } from './tasks'
import { CliState } from './src/contracts'
import { error, fatal } from './src/logger'

/**
 * Running all the tasks to create a new project.
 */
export async function runTasks () {
  const argv = getops(process.argv.slice(2), {
    string: ['boilerplate'],
  })

  /**
   * Ensure project name is defined
   */
  if (!argv._.length) {
    error('Project name is required to create a new app')
    return
  }

  let state: CliState = {
    boilerplate: argv.boilerplate || 'web',
    db: !!argv.db,
  }

  const projectRoot = argv._[0].trim()

  /**
   * If project root is not absolute, then we derive it from the current
   * working directory
   */
  const absPath = isAbsolute(projectRoot) ? projectRoot : join(process.cwd(), projectRoot)

  /**
   * Ensuring that defined path exists
   */
  ensureDirSync(absPath)

  if (!isEmptyDir(absPath)) {
    const errors = [
      `Cannot overwrite contents of {${projectRoot}} directory.`,
      'Make sure to define path to an empty directory',
    ]

    error(errors.join(' '))
    return
  }

  /**
   * Creating application instance
   */
  const application = new Application(absPath, {} as any, {}, {})

  for (let task of tasks) {
    try {
      await task(absPath, application, state)
    } catch (err) {
      error('Unable to create new project. Rolling back')
      fatal(err)
      removeSync(absPath)
      return
    }
  }
}
