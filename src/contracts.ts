/*
* create-adonis-ts-app
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ApplicationContract } from '@poppinss/application'
export type TaskFn = (absPath: string, application: ApplicationContract) => void
