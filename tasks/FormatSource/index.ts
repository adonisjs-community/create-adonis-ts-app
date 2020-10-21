/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import execa from 'execa'
import { TaskFn } from '../../src/contracts'

/**
 * Format source files using prettier
 */
const task: TaskFn = async (_, __, { absPath, prettier }) => {
	if (!prettier) {
		return
	}

	/**
	 * Generate ace-manifest file in the newly created project
	 */
	const format = execa('npm', ['run', 'format'], {
		cwd: absPath,
	})
	format.stdout!.pipe(process.stdout)

	/**
	 * Formatting source is a secondary action and errors can be
	 * ignored
	 */
	try {
		await format
	} catch {}
}

export default task
