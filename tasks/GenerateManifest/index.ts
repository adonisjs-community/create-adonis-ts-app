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
 * Generate manifest file by running `node ace generate:manifest` file
 */
const task: TaskFn = async (_, __, { absPath }) => {
	/**
	 * Generate ace-manifest file in the newly created project
	 */
	const manifest = execa.node('ace', ['generate:manifest'], {
		cwd: absPath,
		env: {
			FORCE_COLOR: 'true',
		},
	})
	manifest.stdout!.pipe(process.stdout)

	/**
	 * Generating ace-manifest file is a secondary action and errors
	 * can be ignored
	 */
	try {
		await manifest
	} catch {}
}

export default task
