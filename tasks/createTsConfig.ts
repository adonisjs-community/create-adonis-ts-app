/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { JsonFile } from '@adonisjs/sink'

import { create } from '../src/logger'
import { TaskFn } from '../src/contracts'

/**
 * Creates `tsconfig.json` file
 */
const task: TaskFn = (absPath) => {
  const tsconfig = new JsonFile(absPath, 'tsconfig.json')

  tsconfig.set('include', ['**/*'])
  tsconfig.set('exclude', ['node_modules', 'build'])
  tsconfig.set('extends', './node_modules/adonis-preset-ts/tsconfig')
  tsconfig.set('compilerOptions', {
    paths: {
      'App/*': ['./app/*'],
      'Contracts/*': ['./contracts/*'],
    },
  })

  tsconfig.commit()
  create('tsconfig.json')
}

export default task
