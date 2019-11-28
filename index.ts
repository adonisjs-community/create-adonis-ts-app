/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import getops from 'getopts'
import { Prompt } from '@poppinss/prompts'
import { isAbsolute, join, basename } from 'path'
import { isEmptyDir, logger } from '@adonisjs/sink'
import { ensureDirSync, removeSync } from 'fs-extra'
import { Application } from '@adonisjs/application/build/standalone'

import { tasks } from './tasks'
import { CliState } from './src/contracts'

/**
 * Running all the tasks to create a new project.
 */
export async function runTasks (args: string[]) {
  const argv = getops(args, {
    string: ['boilerplate', 'name'],
    boolean: ['tslint'],
    default: {
      tslint: null,
    },
  })

  /**
   * Ensure project name is defined
   */
  if (!argv._.length) {
    logger.error('Project name is required to create a new app')
    return
  }

  const projectRoot = argv._[0].trim()

  /**
   * If project root is not absolute, then we derive it from the current
   * working directory
   */
  const absPath = isAbsolute(projectRoot) ? projectRoot : join(process.cwd(), projectRoot)

  let state: CliState = {
    baseName: projectRoot,
    boilerplate: argv.boilerplate,
    name: argv.name,
    tslint: argv.tslint,
  }

  /**
   * Ask for the project structure
   */
  if (!state.boilerplate) {
    state.boilerplate = await new Prompt().choice('Select the project structure', [
      {
        name: 'api',
        message: 'API Server',
      },
      {
        name: 'web',
        message: 'Web Application',
      },
    ])
  }

  /**
   * Ask for project name. We can fill it inside the `package.json`
   * file
   */
  if (!state.name) {
    state.name = await new Prompt().ask('Enter the project name', {
      default: basename(absPath),
    })
  }

  /**
   * Ask for project name. We can fill it inside the `package.json`
   * file
   */
  if (state.tslint === null) {
    state.tslint = await new Prompt().confirm('Setup tslint?')
  }

  // tslint:disable-next-line: max-line-length quotemark
  console.log("    _       _             _         _     \n   / \\   __| | ___  _ __ (_)___    | |___ \n  / _ \\ / _` |/ _ \\| '_ \\| / __|_  | / __|\n / ___ \\ (_| | (_) | | | | \\__ \\ |_| \\__ \\\n/_/   \\_\\__,_|\\___/|_| |_|_|___/\\___/|___/\n")

  /**
   * Ensuring that defined path exists
   */
  ensureDirSync(absPath)

  if (!isEmptyDir(absPath)) {
    const errors = [
      `Cannot overwrite contents of {${projectRoot}} directory.`,
      'Make sure to define path to an empty directory',
    ]

    logger.error(errors.join(' '))
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
      logger.error('Unable to create new project. Rolling back')
      logger.fatal(err)
      removeSync(absPath)
      return
    }
  }
}
