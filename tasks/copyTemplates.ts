/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { join } from 'path'
import { TemplateFile } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'
import { logCreateFile } from '../src/logger'

const templates = [
  'server.ts',
  'start/app.ts',
  'start/kernel.ts',
  'start/routes.ts',
  'app/Exceptions/Handler.ts',
]

/**
 * Copies templates to project directory
 */
const task: TaskFn = (absPath) => {
  templates.forEach((template) => {
    new TemplateFile(
      absPath,
      template,
      join(__dirname, '..', 'templates', template.replace(/\.ts$/, '.txt')),
    )
      .apply({})
      .commit()

    logCreateFile(template)
  })
}

export default task
