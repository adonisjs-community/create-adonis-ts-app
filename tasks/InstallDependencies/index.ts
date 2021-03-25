/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { TaskFn } from '../../src/contracts'
import { getInstallMessage } from '../../src/Helpers'
import { packages } from '../../src/Schematics/packages'

/**
 * Creates the `package.json` file in the project root and installs
 * required dependencies
 */
const task: TaskFn = async (_, logger, { pkg, client, boilerplate }) => {
  /**
   * Set by `yarn create`
   */
  if (client === 'yarn') {
    pkg.yarn(true)
  }

  /**
   * Install adonisjs packages for the selected boilerplate
   */
  const boilerPlatePackages = packages[boilerplate]
  Object.keys(boilerPlatePackages).forEach((pkgName) => {
    pkg.install(pkgName, boilerPlatePackages[pkgName].version, false)
  })

  /**
   * Required dependencies for all projects
   */
  pkg.install('proxy-addr', 'latest', false)
  pkg.install('reflect-metadata', 'latest', false)
  pkg.install('source-map-support', 'latest', false)

  /**
   * Required dev dependencies
   */
  pkg.install('typescript', '~4.2')
  pkg.install('youch')
  pkg.install('youch-terminal')
  pkg.install('pino-pretty')
  pkg.install('adonis-preset-ts')
  pkg.install('@adonisjs/assembler', '^5.0.0')

  /**
   * Displaying a spinner, since install packages takes
   * a while
   */
  let spinner: ReturnType<typeof logger.await> | undefined
  pkg.beforeInstall((list, dev) => {
    /**
     * The callback is invoked twice. First for dev dependencies
     * and then for prod depdencies and hence we should stop
     * the old spinner before starting a new one
     */
    if (spinner) {
      spinner.stop()
    }

    spinner = logger.await(getInstallMessage(list), undefined, dev ? 'dev' : 'prod')
  })

  /**
   * Commit mutations
   */
  const response = await pkg.commitAsync()
  spinner && spinner.stop()

  if (response && response.status === 1) {
    const errorMessage = client === 'yarn' ? 'yarn install failed' : 'npm install failed'
    const error = new Error(errorMessage)
    error['stack'] = response.stderr.toString()
    throw error
  } else {
    logger.action('create').succeeded('package.json')
  }
}

export default task
