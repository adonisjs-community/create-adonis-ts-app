/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { CliState } from '../contracts'

export const packages: {
  [K in CliState['boilerplate']]: {
    [pkg: string]: { version: string },
  }
} = {
  web: {
    '@adonisjs/core': {
      version: 'latest',
    },
    '@adonisjs/fold': {
      version: '6',
    },
    '@adonisjs/ace': {
      version: '6',
    },
    '@adonisjs/bodyparser': {
      version: '3',
    },
    '@adonisjs/session': {
      version: '2',
    },
    '@adonisjs/view': {
      version: 'latest',
    },
  },
  api: {
    '@adonisjs/core': {
      version: 'latest',
    },
    '@adonisjs/ace': {
      version: '6',
    },
    '@adonisjs/fold': {
      version: '6',
    },
    '@adonisjs/bodyparser': {
      version: '3',
    },
  },
}
