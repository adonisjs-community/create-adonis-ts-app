/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { LinesFile } from '@adonisjs/sink'
import fancyLogs from '@poppinss/fancy-logs'

import { TaskFn } from '../src/contracts'

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
  fancyLogs.create({ message: '.gitignore', icon: false })
}

export default task
