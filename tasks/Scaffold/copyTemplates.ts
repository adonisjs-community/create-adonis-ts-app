/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'path'
import { fsReadAll } from '@poppinss/utils'
import { utils, files } from '@adonisjs/sink'

import { TaskFn } from '../../src/contracts'

/**
 * Copy boilerplate files to the destination
 */
const task: TaskFn = (_, logger, { boilerplate, absPath }) => {
	const baseDir = join(__dirname, '..', '..', 'templates', boilerplate)
	const templateFiles = fsReadAll(baseDir, () => true)

	templateFiles.forEach((name: string) => {
		if (name.endsWith('.ico')) {
			utils.copyFiles(baseDir, absPath, [name]).forEach(({ filePath, state }) => {
				const action = logger.action('create')
				state === 'copied' ? action.succeeded(filePath) : action.skipped(filePath)
			})
			return
		}

		const outputFileName = name.replace(/\.txt$/, '.ts')
		const src = join(baseDir, name)
		new files.MustacheFile(absPath, outputFileName, src).apply({}).commit()
		logger.action('create').succeeded(outputFileName)
	})
}

export default task
