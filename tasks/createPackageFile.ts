/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { PackageFile } from '@adonisjs/sink'

/**
 * Creates the `package.json` file in the project root and installs
 * required dependencies
 */
export default function createPackageFile (basePath: string, appName: string) {
  const pkg = new PackageFile(basePath)
  pkg.set('name', appName)
  pkg.set('version', '0.0.0')
  pkg.set('private', true)

  pkg.setScript('build', 'adonis build')
  pkg.setScript('start', 'adonis serve --dev')

  /**
   * Use yarn when executed as `yarn create`
   */
  if (process.env.npm_execpath && process.env.npm_execpath.includes('yarn')) {
    pkg.yarn(true)
  }

  /**
   * Prod dependencies
   */
  pkg.install('@adonisjs/core', 'latest', false)
  pkg.install('@adonisjs/fold', '6', false)
  pkg.install('reflect-metadata', 'latest', false)

  /**
   * Dev dependencies
   */
  pkg.install('typescript')
  pkg.install('youch')
  pkg.install('youch-terminal')
  pkg.install('pino-pretty')
  pkg.install('tslint')
  pkg.install('tslint-eslint-rules')
  pkg.install('adonis-preset-ts')

  /**
   * Commit mutations
   */
  pkg.commit()
}
