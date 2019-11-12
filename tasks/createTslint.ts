/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { JsonFile, logger } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'

/**
 * Creates `tslint.json` file
 */
const task: TaskFn = (absPath) => {
  const tslint = new JsonFile(absPath, 'tslint.json')
  tslint.set('extends', 'adonis-preset-ts/tslint')
  tslint.set('rules', {})
  tslint.commit()
  logger.create('tslint.json')
}

export default task
