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
   * Prod dependencies
   */
  pkg.install({
    '@adonisjs/core': 'latest',
    '@adonisjs/fold': 'next',
    'reflect-metadata': 'latest',
  }, false)

  /**
   * Dev dependencies
   */
  pkg.install([
    'typescript',
    'youch',
    'youch-terminal',
    'pino-pretty',
    'tslint',
    'adonis-preset-ts',
  ])
  pkg.commit()
}
