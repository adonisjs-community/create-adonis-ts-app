/*
* create-adonis-ts-app
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Application } from '@adonisjs/application/build/standalone'

/**
 * Shape of task functions
 */
export type TaskFn = (
  absPath: string,
  application: Application,
  state: CliState,
) => void | Promise<void>

/**
 * CLI state
 */
export type CliState = {
  boilerplate: 'web' | 'api',
}
