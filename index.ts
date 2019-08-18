/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { red } from 'kleur'
import { isAbsolute, join } from 'path'
import { isEmptyDir } from '@adonisjs/sink'
import { Application } from '@poppinss/application'
import { ensureDirSync, removeSync } from 'fs-extra'

import { tasks } from './tasks'
import { logError } from './src/logger'

/**
 * Running all the tasks to create a new project.
 */
export async function runTasks () {
  const argv = process.argv.slice(2)
  if (!argv.length) {
    console.log(red('Project name is required to create a new app'))
    return
  }

  const projectRoot = argv[0].trim()

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

    console.log(red(errors.join(' ')))
    return
  }

  /**
   * Creating application instance
   */
  const application = new Application(absPath, {} as any, {}, {})

  for (let task of tasks) {
    try {
      await task(absPath, application)
    } catch (error) {
      logError('Unable to create new project. Rolling back')
      removeSync(absPath)
    }
  }
}
