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

import { create } from '../src/logger'
import { TaskFn } from '../src/contracts'
import { packages } from '../src/boilerplate/packages'

const templates = [
  'server.txt',
  'start/app.txt',
  'start/kernel.txt',
  'start/routes.txt',
  'app/Exceptions/Handler.txt',
  'providers/AppProvider.txt',
]

/**
 * Copies templates to project directory
 */
const task: TaskFn = (absPath, _app, state) => {
  const boilerPlatePackages = packages[state.boilerplate]
  if (state.boilerplate === 'api') {
    templates.push('app/Middleware/SpoofAccept.ts')
  }

  templates.forEach((template) => {
    let data: any = {}

    /**
     * Defining providers for the `start/app` file
     */
    if (template === 'start/app.txt') {
      data.providers = []
      Object.keys(boilerPlatePackages).forEach((name) => {
        if (boilerPlatePackages[name].providers.length) {
          data.providers = data.providers.concat(`'${boilerPlatePackages[name].providers}',`)
        }
      })

      data.providers.push(`'./providers/AppProvider',`)
    }

    /**
     * Middleware based upon the type of project
     */
    if (template === 'start/kernel.txt') {
      data.middleware = state.boilerplate === 'api'
        ? [`'App/Middleware/SpoofAccept',`, `'Adonis/Addons/BodyParserMiddleware',`]
        : [`'Adonis/Addons/BodyParserMiddleware',`]
    }

    new TemplateFile(
      absPath,
      template.replace(/\.txt$/, '.ts'),
      join(__dirname, '..', 'templates', template),
    )
      .apply(data)
      .commit()

    create(template)
  })
}

export default task
