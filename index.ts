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
import { isEmptyDir, logger, colors } from '@adonisjs/sink'
import { ensureDirSync, removeSync } from 'fs-extra'
import { Application } from '@adonisjs/application/build/standalone'

import { tasks } from './tasks'
import { CliState } from './src/contracts'

const USING_YARN = !!(process.env.npm_execpath && process.env.npm_execpath.includes('yarn'))

/* eslint-disable-next-line */
const BADGE = "    _       _             _         _     \n   / \\   __| | ___  _ __ (_)___    | |___ \n  / _ \\ / _` |/ _ \\| '_ \\| / __|_  | / __|\n / ___ \\ (_| | (_) | | | | \\__ \\ |_| \\__ \\\n/_/   \\_\\__,_|\\___/|_| |_|_|___/\\___/|___/\n"

/**
 * Help screen output
 */
const HELP = `${colors.green(USING_YARN ? 'yarn create adonis-ts-app' : 'npx create-adonis-ts-app')} ${colors.dim('<project-name>')}

${colors.yellow('Options')}
${colors.green('--boilerplate')} ${colors.green('<api,web>')}    ${colors.dim('Choose API boilerplate')}
${colors.green('--name')} ${colors.green('<string>')}            ${colors.dim('Define custom application name')}
${colors.green('--eslint')} ${colors.green('<boolean>')}         ${colors.dim('Enable/disable eslint setup')}
`

/**
 * Running all the tasks to create a new project.
 */
export async function runTasks (args: string[]) {
  const argv = getops(args, {
    string: ['boilerplate', 'name'],
    boolean: ['eslint'],
    default: {
      eslint: null,
    },
  })

  console.log(BADGE)

  /**
   * Ensure project name is defined
   */
  if (!argv._.length) {
    console.log(HELP)
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
    eslint: argv.eslint,
    client: USING_YARN ? 'yarn' : 'npm',
  }

  /**
   * Ask for the project structure
   */
  if (!state.boilerplate) {
    try {
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
    } catch (_) {
      process.exit(1)
    }
  }

  /**
   * Ask for project name. We can fill it inside the `package.json`
   * file
   */
  if (!state.name) {
    try {
      state.name = await new Prompt().ask('Enter the project name', {
        default: basename(absPath),
      })
    } catch (_) {
      process.exit(1)
    }
  }

  /**
   * Ask for project name. We can fill it inside the `package.json`
   * file
   */
  if (state.eslint === null) {
    try {
      state.eslint = await new Prompt().confirm('Setup eslint?')
    } catch (_) {
      process.exit(1)
    }
  }

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
   * Set environment variables that can be used by the packages
   * to tweak their setup behavior
   */
  process.env['ADONIS_CREATE_APP_NAME'] = state.name
  process.env['ADONIS_CREATE_ESLINT'] = String(state.eslint)
  process.env['ADONIS_CREATE_APP_CLIENT'] = state.client
  process.env['ADONIS_CREATE_APP_BOILERPLATE'] = state.boilerplate

  /**
   * Setup application
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
