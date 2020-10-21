/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import execa from 'execa'
import { tasks } from '@adonisjs/sink'
import { TaskFn } from '../../src/contracts'
import { packages } from '../../src/Schematics/packages'

/**
 * Configure installed packages by running `node ace invoke instructions`
 * on all of them in sequence
 */
const task: TaskFn = async (application, logger, { boilerplate, absPath }) => {
	let instructionsError: Error | null = null

	/**
	 * Executing instructions in sequence. Do not convert this block to
	 * parallel execution, since two instructions touching the same
	 * file may lead to race conditions.
	 */
	try {
		for (let pkg of Object.keys(packages[boilerplate])) {
			await new tasks.Instructions(pkg, absPath, application, false).useLogger(logger).execute()
		}
	} catch (error) {
		instructionsError = error
	}

	/**
	 * Handle error
	 */
	if (instructionsError) {
		logger.fatal(instructionsError)
		throw instructionsError
	}

	/**
	 * Generate ace file in the newly created project
	 */
	const subprocess = execa.node('ace', ['generate:manifest'], {
		cwd: absPath,
		env: {
			FORCE_COLOR: 'true',
		},
	})
	subprocess.stdout!.pipe(process.stdout)

	/**
	 * Generating ace-manifest file is a secondary action and errors
	 * can be ignored
	 */
	try {
		await subprocess
	} catch {}
}

export default task
