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
    [pkg: string]: { version: string, providers: string[] },
  }
} = {
  web: {
    '@adonisjs/core': {
      version: 'latest',
      providers: ['@adonisjs/core'],
    },
    '@adonisjs/fold': {
      version: '6',
      providers: [],
    },
    '@adonisjs/bodyparser': {
      version: '3',
      providers: ['@adonisjs/bodyparser'],
    },
    '@adonisjs/session': {
      version: '2',
      providers: ['@adonisjs/session'],
    },
    '@adonisjs/view': {
      version: 'latest',
      providers: ['@adonisjs/view'],
    },
  },
  api: {
    '@adonisjs/core': {
      version: 'latest',
      providers: ['@adonisjs/core'],
    },
    '@adonisjs/fold': {
      version: '6',
      providers: [],
    },
    '@adonisjs/bodyparser': {
      version: '3',
      providers: ['@adonisjs/bodyparser'],
    },
  },
}
