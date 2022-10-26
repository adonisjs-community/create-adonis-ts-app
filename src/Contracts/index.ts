/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { logger as sinkLogger, files } from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/**
 * Shape of task functions
 */
export type TaskFn = (
  application: ApplicationContract,
  logger: typeof sinkLogger,
  state: CliState
) => void | Promise<void>

/**
 * CLI state
 */
export type CliState = {
  baseName: string
  absPath: string
  debug: boolean
  client: 'npm' | 'pnpm' | 'yarn'
  boilerplate: 'web' | 'api' | 'slim'
  projectName: string
  eslint: boolean
  prettier: boolean
  bundler: 'vite' | 'encore'
  pkg: files.PackageJsonFile
}
