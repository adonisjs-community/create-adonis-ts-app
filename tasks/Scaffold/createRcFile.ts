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
 * Creates the `.adonisrc.json` inside destination
 */
const task: TaskFn = (_, logger, { absPath }) => {
	const rcFile = new files.AdonisRcFile(absPath)

	/**
	 * Yes, it is a typescript project
	 */
	rcFile.set('typescript', true)

	/**
	 * Application level commands
	 */
	rcFile.addCommand('./commands')

	/**
	 * The exception handler to handle HTTP exceptions
	 */
	rcFile.setExceptionHandler('App/Exceptions/Handler')

	/**
	 * Aliases the app will use
	 */
	rcFile.setAlias('App', 'app')
	rcFile.setAlias('Config', 'config')
	rcFile.setAlias('Database', 'database')
	rcFile.setAlias('Contracts', 'contracts')

	/**
	 * Files to preload
	 */
	rcFile.setPreload('./start/routes')
	rcFile.setPreload('./start/kernel')

	/**
	 * Application level provider
	 */
	rcFile.addProvider('./providers/AppProvider')

	/**
	 * Create .adonisrc.json file
	 */
	rcFile.commit()
	logger.action('create').succeeded('.adonisrc.json')
}

export default task
