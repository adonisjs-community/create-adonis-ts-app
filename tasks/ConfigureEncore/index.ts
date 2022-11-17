/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import execa from 'execa'
import { join } from 'path'
import { files, logger as SinkLogger } from '@adonisjs/sink'
import { TaskFn } from '../../src/contracts'

/**
 * Creates the CSS entrypoint
 */
function createCssEntryPoint(absPath: string, logger: typeof SinkLogger) {
  const template = join(__dirname, '..', '..', 'templates/stubs/css/app.css')
  const outFile = 'resources/css/app.css'

  const cssFile = new files.MustacheFile(absPath, outFile, template).apply({})
  cssFile.overwrite = true
  cssFile.commit()
  logger.action('create').succeeded(outFile)
}

/**
 * Creates the JS entrypoint
 */
function createJsEntryPoint(absPath: string, logger: typeof SinkLogger) {
  const template = join(__dirname, '..', '..', 'templates/stubs/js/app.js')
  const outFile = 'resources/js/app.js'

  const jsFile = new files.MustacheFile(absPath, outFile, template).apply({})
  jsFile.overwrite = true
  jsFile.commit()
  logger.action('create').succeeded(outFile)
}

/**
 * Setup webpack encore inside the project
 */
const task: TaskFn = async (_, logger, { absPath, debug, pkg }) => {
  let spinner: ReturnType<typeof logger.await> | undefined
  if (!debug) {
    spinner = logger.await(
      `installing @symfony/webpack-core ${logger.colors.yellow('(usually takes longer)')}`
    )
  }
  
  pkg.install('@symfony/webpack-encore', '~3.1.0')

  try {
    await execa('node', ['ace', 'configure', 'encore'], {
      cwd: absPath,
      ...(debug ? { stdio: 'inherit' } : {}),
    })
    spinner && spinner.stop()

    createCssEntryPoint(absPath, logger)
    createJsEntryPoint(absPath, logger)
  } catch (error) {
    spinner && spinner.stop()
    throw error
  }
}

export default task
