/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { kleur } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'

/**
 * Executes instructions on the installed packages
 */
const task: TaskFn = async (_absPath, _app, state) => {
	console.log('')
	console.log('🎉 Successfully created the project')
	console.log('👉 Execute following commands to get started')

	console.log(`   ${kleur.gray('$')} ${kleur.cyan(`cd ${state.baseName}`)}`)
	console.log(`   ${kleur.gray('$')} ${kleur.cyan('node ace serve --watch')}`)
	console.log('')
}

export default task
