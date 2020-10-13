/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import createRcFile from './Scaffold/createRcFile'
import setupEslint from './Scaffold/setupEslint'
import setupPrettier from './Scaffold/setupPrettier'
import copyTemplates from './Scaffold/copyTemplates'
import createTsConfig from './Scaffold/createTsConfig'
import createGitIgnore from './Scaffold/createGitIgnore'
import configurePackages from './ConfigurePackages'
import createEditorConfig from './Scaffold/createEditorConfig'
import installDependencies from './InstallDependencies'

/**
 * An array of tasks to be executed in chronological order
 */
export const tasks = [
	{
		title: 'Scaffold project',
		actions: [
			copyTemplates,
			createEditorConfig,
			createGitIgnore,
			createRcFile,
			createTsConfig,
			setupEslint,
			setupPrettier,
		],
	},
	{
		title: 'Install dependencies',
		actions: [installDependencies],
	},
	{
		title: 'Configure installed packages',
		actions: [configurePackages],
	},
]
