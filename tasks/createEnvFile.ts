/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import randomstring from 'randomstring'
import { files, logger } from '@adonisjs/sink'

import { TaskFn } from '../src/contracts'

/**
 * Creates the `.env` file inside the project root. Also
 * `.env.example` file will be created with just the
 * keys
 */
const task: TaskFn = (absPath) => {
  const env = new files.EnvFile(absPath)

  env.set('PORT', '3333')
  env.set('HOST', '0.0.0.0')
  env.set('NODE_ENV', 'development')
  env.set('APP_KEY', randomstring.generate(32))

  env.commit()
  logger.create('.env, .env.example')
}

export default task
