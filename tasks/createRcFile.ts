/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { RcFile, logger } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'
import { metaFiles } from '../src/schematics/rcMetaFiles'

/**
 * Creates the `.adonisrc.json` file in the project root
 */
const task: TaskFn = (absPath, _app, state) => {
  const rcFile = new RcFile(absPath)

  rcFile.set('typescript', true)
  rcFile.set('commands', [])
  rcFile.setExceptionHandler('App/Exceptions/Handler')
  rcFile.setAutoload('App', 'app')
  rcFile.setAutoload('Contracts', 'contracts')

  rcFile.setPreload('start/routes')
  rcFile.setPreload('start/kernel')

  metaFiles[state.boilerplate].forEach((file) => {
    rcFile.addMetaFile(file)
  })

  rcFile.commit()
  logger.create('.adonisrc.json')
}

export default task
