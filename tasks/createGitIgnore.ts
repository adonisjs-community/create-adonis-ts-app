/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { LinesFile } from '@adonisjs/sink'

import { TaskFn } from '../src/contracts'
import { create } from '../src/logger'

/**
 * Creates `.gitignore` file inside the project root.
 */
const task: TaskFn = (absPath) => {
  const gitignore = new LinesFile(absPath, '.gitignore')

  gitignore.add('node_modules')
  gitignore.add('build')
  gitignore.add('coverage')
  gitignore.add('.vscode')
  gitignore.add('.DS_STORE')

  gitignore.commit()
  create('.gitignore')
}

export default task
