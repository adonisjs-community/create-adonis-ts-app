/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { files, logger } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'

/**
 * Creates `tsconfig.json` file
 */
const task: TaskFn = (absPath) => {
  const tsconfig = new files.JsonFile(absPath, 'tsconfig.json')

  tsconfig.set('include', ['**/*'])
  tsconfig.set('exclude', ['node_modules', 'build'])
  tsconfig.set('extends', './node_modules/adonis-preset-ts/tsconfig')

  tsconfig.set('compilerOptions', {
    outDir: 'build',
    rootDir: './',
    sourceMap: true,
    paths: {
      'App/*': ['./app/*'],
      'Contracts/*': ['./contracts/*'],
      'Database/*': ['./database/*'],
    },
  })

  tsconfig.commit()
  logger.create('tsconfig.json')
}

export default task
