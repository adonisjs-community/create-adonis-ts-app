/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'path'
import { files } from '@adonisjs/sink'
import { TaskFn } from '../../src/contracts'

/**
 * Setup webpack encore inside the project
 */
const task: TaskFn = (_, logger, { absPath, boilerplate, encore, pkg }) => {
  if (!encore || boilerplate !== 'web') {
    return
  }

  /**
   * Create the webpack config file
   */
  new files.MustacheFile(
    absPath,
    'webpack.config.js',
    join(__dirname, '..', '..', 'templates/stubs/webpack.config.txt')
  )
    .apply({})
    .commit()

  /**
   * Create sample `resources/js/app.js` file
   */
  new files.NewLineFile(absPath, 'resources/js/app.js').add('// app entrypoint').commit()

  /**
   * Install required dependencies
   */
  pkg.install('@symfony/webpack-encore')

  logger.action('create').succeeded('webpack.config.js')
  logger.action('create').succeeded('resources/js/app.js')
}

export default task
