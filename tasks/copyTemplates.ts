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

const templates = [
  'server.ts',
  'start/app.ts',
  'start/kernel.ts',
  'start/routes.ts',
  'app/Exceptions/Handler.ts',
]

/**
 * Creates the `package.json` file in the project root and installs
 * required dependencies
 */
export default function createPackageFile (basePath: string) {
  templates.forEach((template) => {
    new TemplateFile(
      basePath,
      template,
      join(__dirname, '..', 'templates', template.replace(/\.ts$/, '.txt')),
    )
      .apply({})
      .commit()
  })
}
