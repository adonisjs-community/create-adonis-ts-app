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
 * Setup eslint inside the project
 */
const task: TaskFn = (_, logger, { absPath, eslint, pkg }) => {
	if (!eslint) {
		return
	}

	/**
	 * Create eslintRc file
	 */
	const eslintRc = new files.JsonFile(absPath, '.eslintrc.json')
	eslintRc.set('extends', ['plugin:adonis/typescriptApp'])
	eslintRc.commit()

	/**
	 * Create eslintIgnore file
	 */
	const eslintIgnore = new files.NewLineFile(absPath, '.eslintignore')
	eslintIgnore.add('build')
	eslintIgnore.commit()

	/**
	 * Setup package.json file
	 */
	pkg.install('eslint')
	pkg.install('eslint-plugin-adonis')
	pkg.setScript('lint', 'eslint . --ext=.ts')

	logger.action('create').succeeded('.eslintrc.json, .eslintignore')
}

export default task
