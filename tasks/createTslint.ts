/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { JsonFile } from '@adonisjs/sink'

/**
 * Creates `tslint.json` file
 */
export default function createTsLint (projectRoot: string) {
  const tslint = new JsonFile(projectRoot, 'tslint.json')
  tslint.set('extends', 'adonis-preset-ts/tsconfig')
  tslint.set('rules', {})
  tslint.commit()
}
