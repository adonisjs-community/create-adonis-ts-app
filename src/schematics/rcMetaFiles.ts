/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { CliState } from '../contracts'

export const metaFiles: {
  [K in CliState['boilerplate']]: string[]
} = {
  web: [
    '.env',
    '.adonisrc.json',
    'resources/views/**/*.edge',
    'public/**',
  ],
  api: [
    '.env',
    '.adonisrc.json',
  ],
}
