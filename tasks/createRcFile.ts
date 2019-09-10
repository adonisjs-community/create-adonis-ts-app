/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { RcFile } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'
import { logCreateFile } from '../src/logger'

/**
 * Creates the `.adonisrc.json` file in the project root
 */
const task: TaskFn = (absPath) => {
  const rcFile = new RcFile(absPath)

  rcFile.setExceptionHandler('App/Exceptions/Handler')
  rcFile.setAutoload('App', 'app')
  rcFile.setAutoload('Contracts', 'contracts')

  rcFile.setPreload('start/routes')
  rcFile.setPreload('start/kernel')

  rcFile.addMetaFile('.env')
  rcFile.addMetaFile('.adonisrc.json')
  rcFile.addMetaFile('.gitignore')

  rcFile.commit()
  logCreateFile('.adonisrc.json')
}

export default task
