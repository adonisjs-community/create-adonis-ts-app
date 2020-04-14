/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { join } from 'path'
import { fsReadAll } from '@poppinss/utils'
import { files, utils, logger } from '@adonisjs/sink'

import { TaskFn } from '../src/contracts'

/**
 * Copies templates to project directory
 */
const task: TaskFn = (absPath, _app, state) => {
  const baseDir = join(__dirname, '..', 'templates', state.boilerplate)
  const templateFiles = fsReadAll(baseDir, () => true)

  templateFiles
    .forEach((name: string) => {
      if (name.endsWith('.ico')) {
        utils.copyFiles(baseDir, absPath, [name])
        return
      }

      if (name.endsWith('.txt')) {
        const outputFileName = name.replace(/\.txt$/, '.ts')
        const src = join(baseDir, name)
        new files.MustacheFile(absPath, outputFileName, src).apply({}).commit()
        logger.create(outputFileName)
      }
    })
}

export default task
