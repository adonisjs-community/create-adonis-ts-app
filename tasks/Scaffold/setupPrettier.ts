/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { files } from '@adonisjs/sink'
import { TaskFn } from '../../src/contracts'

/**
 * Setup prettier inside the project
 */
const task: TaskFn = (_, logger, { absPath, prettier, eslint, pkg }) => {
  if (!eslint || !prettier) {
    return
  }

  /**
   * Create prettierrc file
   */
  pkg.set('prettier.trailingComma', 'es5')
  pkg.set('prettier.semi', false)
  pkg.set('prettier.singleQuote', true)
  pkg.set('prettier.useTabs', false)
  pkg.set('prettier.quoteProps', 'consistent')
  pkg.set('prettier.bracketSpacing', true)
  pkg.set('prettier.arrowParens', 'always')
  pkg.set('prettier.printWidth', 100)
  pkg.commit()

  /**
   * Create prettier ignore file
   */
  const prettierIgnore = new files.NewLineFile(absPath, '.prettierignore')
  prettierIgnore.add('build')
  prettierIgnore.commit()
  logger.action('create').succeeded('.prettierignore')

  /**
   * Install prettier dependencies and register formatting
   * script
   */
  pkg.install('prettier')
  pkg.install('eslint-config-prettier')
  pkg.install('eslint-plugin-prettier')
  pkg.setScript('format', 'prettier --write .')
}

export default task
