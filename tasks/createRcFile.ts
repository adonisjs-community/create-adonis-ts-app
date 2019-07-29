/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { RcFile } from '@adonisjs/sink'
import { ApplicationContract } from '@poppinss/application'

/**
 * Creates the `.adonisrc.json` file in the project root
 */
export default function createRcFile (basePath: string, application: ApplicationContract) {
  const rcFile = new RcFile(basePath)

  rcFile.setExceptionHandler('App/Exceptions/Handler')
  rcFile.setAutoload('App', 'app')
  rcFile.setAutoload('Contracts', 'contracts')

  application.directoriesMap.forEach((value, key) => {
    rcFile.setDirectory(key, value)
  })

  rcFile.setPreload('start/routes')
  rcFile.setPreload('start/kernel')

  rcFile.addCopyToBuildFile('.env')
  rcFile.addCopyToBuildFile('.adonisrc.json')
  rcFile.addCopyToBuildFile('.gitignore')

  rcFile.commit()
}
