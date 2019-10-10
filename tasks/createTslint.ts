/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { JsonFile } from '@adonisjs/sink'
import fancyLogs from '@poppinss/fancy-logs'

import { TaskFn } from '../src/contracts'

/**
 * Creates `tslint.json` file
 */
const task: TaskFn = (absPath) => {
  const tslint = new JsonFile(absPath, 'tslint.json')
  tslint.set('extends', 'adonis-preset-ts/tslint')
  tslint.set('rules', {})
  tslint.commit()
  fancyLogs.create({ message: 'tslint.json', icon: false })
}

export default task
