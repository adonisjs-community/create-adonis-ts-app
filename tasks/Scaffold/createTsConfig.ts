/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { files } from '@adonisjs/sink'
import { TaskFn } from '../../src/Contracts'

/**
 * Creates `tsconfig.json` file inside destination
 */
const task: TaskFn = (_, logger, { absPath }) => {
  const tsconfig = new files.JsonFile(absPath, 'tsconfig.json')

  /**
   * Use a base config file
   */
  tsconfig.set('extends', 'adonis-preset-ts/tsconfig.json')

  /**
   * Include everything
   */
  tsconfig.set('include', ['**/*'])

  /**
   * Except "node_modules" and the "build" folder
   */
  tsconfig.set('exclude', ['node_modules', 'build'])

  /**
   * Define compiler options
   */
  tsconfig.set('compilerOptions', {
    outDir: 'build',
    rootDir: './',
    baseUrl: './',
    sourceMap: true,
    paths: {
      'App/*': ['./app/*'],
      'Config/*': ['./config/*'],
      'Contracts/*': ['./contracts/*'],
      'Database/*': ['./database/*'],
    },
  })

  /**
   * Create tsconfig file
   */
  tsconfig.commit()
  logger.action('create').succeeded('tsconfig.json')
}

export default task
