/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import createRcFile from './createRcFile'
import createEnvFile from './createEnvFile'
import createPackageFile from './createPackageFile'
import createGitIgnore from './createGitIgnore'
import createTsConfig from './createTsConfig'
import createTsLint from './createTslint'
import copyTemplates from './copyTemplates'
import createEditorConfig from './createEditorConfig'

/**
 * An array of tasks to be executed in chronological order
 */
export const tasks = [
  createRcFile,
  createEnvFile,
  createGitIgnore,
  createTsConfig,
  createTsLint,
  copyTemplates,
  createEditorConfig,
  createPackageFile,
]
