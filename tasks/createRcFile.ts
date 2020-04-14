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
import { metaFiles } from '../src/schematics/rcMetaFiles'

/**
 * Creates the `.adonisrc.json` file in the project root
 */
const task: TaskFn = (absPath, _app, state) => {
  const rcFile = new files.AdonisRcFile(absPath)

  rcFile.set('typescript', true)
  rcFile.set('commands', ['./commands'])
  rcFile.setExceptionHandler('App/Exceptions/Handler')
  rcFile.setAlias('App', 'app')
  rcFile.setAlias('Contracts', 'contracts')
  rcFile.setAlias('Config', 'config')

  rcFile.setPreload('./start/routes')
  rcFile.setPreload('./start/kernel')
  rcFile.addProvider('./providers/AppProvider')

  metaFiles[state.boilerplate].forEach((file) => {
    rcFile.addMetaFile(file)
  })

  rcFile.commit()
  logger.create('.adonisrc.json')
}

export default task
