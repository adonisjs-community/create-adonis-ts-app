/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { JsonFile, logger, LinesFile } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'

/**
 * Setup eslint inside the project
 */
const task: TaskFn = (absPath, _app, state) => {
  if (!state.eslint) {
    return
  }

  const eslint = new JsonFile(absPath, '.eslintrc.json')
  eslint.set('extends', ['plugin:adonis/typescriptApp'])
  eslint.commit()

  const eslintIgnore = new LinesFile(absPath, '.eslintignore')
  eslintIgnore.add('build')
  eslintIgnore.commit()

  logger.create('.eslintrc.json, .eslintignore')
}

export default task
