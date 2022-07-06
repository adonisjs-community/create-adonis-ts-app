/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { CliState } from '../Contracts'

export const packages: {
  [K in CliState['boilerplate']]: {
    [pkg: string]: { version: string }
  }
} = {
  web: {
    '@adonisjs/core': {
      version: '^5.8.0',
    },
    '@adonisjs/repl': {
      version: '^3.1.0',
    },
    '@adonisjs/session': {
      version: '^6.2.0',
    },
    '@adonisjs/view': {
      version: '^6.1.0',
    },
    '@adonisjs/shield': {
      version: '^7.0.0',
    },
  },
  api: {
    '@adonisjs/core': {
      version: '^5.8.0',
    },
    '@adonisjs/repl': {
      version: '^3.1.0',
    },
  },
  slim: {
    '@adonisjs/core': {
      version: '^5.8.0',
    },
  },
}
