/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import getops from 'getopts'
import { removeSync } from 'fs-extra'
import { Application } from '@adonisjs/application'
import { utils, logger, tasksUi } from '@adonisjs/sink'

import { tasks } from './Tasks'
import { greet } from './src/Chalk/greet'
import { showArt } from './src/Chalk/art'
import { getHelp } from './src/Chalk/help'
import { getState, usingYarn } from './src/Helpers'

/**
 * Running all the tasks to create a new project.
 */
export async function runTasks(args: string[]) {
  showArt()

  /**
   * Setup command line arguments
   */
  const argv = getops(args, {
    string: ['boilerplate', 'name'],
    boolean: ['eslint', 'debug', 'prettier'],
    default: {
      eslint: null,
      debug: false,
      prettier: null,
    },
  })

  /**
   * Show help when no arguments are passed
   */
  if (!argv._.length) {
    console.log(getHelp(usingYarn))
    return
  }

  /**
   * First argument is the project path
   */
  const projectPath = argv._[0].trim()

  console.log('')
  console.log(logger.colors.green('CUSTOMIZE PROJECT'))

  /**
   * Setup state
   */
  const state = await getState(projectPath, {
    client: usingYarn ? 'yarn' : 'npm',
    projectName: argv.name,
    boilerplate: argv.boilerplate,
    eslint: argv.eslint,
    prettier: argv.prettier,
  })

  /**
   * Return when directory is not empty
   */
  if (!utils.isEmptyDir(state.absPath)) {
    const errors = [
      `Cannot overwrite contents of {${projectPath}} directory.`,
      'Make sure to define path to an empty directory',
    ]

    console.log('')
    logger.error(errors.join(' '))
    return
  }

  /**
   * Setup application
   */
  const application = new Application(state.absPath, 'console', {
    typescript: true,
  })

  /**
   * Decide the ui renderer to use
   */
  const tasksManager = argv.debug ? tasksUi.verbose() : tasksUi()

  /**
   * Execute all tasks
   */
  tasks.forEach(({ title, actions }) => {
    tasksManager.add(title, async (taskLogger, task) => {
      for (let action of actions) {
        await action(application, taskLogger, state)
      }
      await task.complete()
    })
  })

  console.log('')
  console.log(logger.colors.green('RUNNING TASKS'))

  /**
   * Run tasks
   */
  try {
    await tasksManager.run()
  } catch (error) {
    tasksManager.state = 'failed'
    tasksManager.error = error
  }

  console.log('')

  /**
   * Notify about failure
   */
  if (tasksManager.state === 'failed') {
    logger.error('Unable to create project. Cleaning up')
    removeSync(state.absPath)
    return
  }

  /**
   * Greet the user to get started
   */
  logger.success('Project created successfully')
  greet(state)
}
