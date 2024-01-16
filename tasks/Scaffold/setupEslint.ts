/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { TaskFn } from '../../src/Contracts'

/**
 * Setup eslint inside the project
 */
const task: TaskFn = (_, __, { prettier, eslint, pkg }) => {
  if (!eslint) {
    return
  }

  /**
   * Setup config for prettier
   */
  if (prettier) {
    pkg.set('eslintConfig.extends', ['plugin:adonis/typescriptApp', 'prettier'])
    pkg.set('eslintConfig.plugins', ['prettier'])
    pkg.set('eslintConfig.rules', {
      'prettier/prettier': ['error'],
    })
    pkg.set('eslintIgnore', ['build'])
  } else {
    // or setup without prettier
    pkg.set('eslintConfig.extends', ['plugin:adonis/typescriptApp'])
    pkg.set('eslintIgnore', ['build'])
  }

  /**
   * Install packages and configure lint script
   */
  pkg.install('eslint')
  pkg.install('eslint-plugin-adonis')
  pkg.setScript('lint', 'eslint . --ext=.ts')
}

export default task
