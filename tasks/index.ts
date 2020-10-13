/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import greet from './greet'
import createRcFile from './createRcFile'
import createEslint from './createEslint'
import copyTemplates from './copyTemplates'
import createEnvFile from './createEnvFile'
import createTsConfig from './createTsConfig'
import createGitIgnore from './createGitIgnore'
import createPackageFile from './createPackageFile'
import createEditorConfig from './createEditorConfig'
import executeInstructions from './executeInstructions'

/**
 * An array of tasks to be executed in chronological order
 */
export const tasks = [
	createRcFile,
	createEnvFile,
	createGitIgnore,
	createTsConfig,
	createEslint,
	copyTemplates,
	createEditorConfig,
	createPackageFile,
	executeInstructions,
	greet,
]
