/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { LinesFile } from '@adonisjs/sink'

/**
 * Creates `.gitignore` file inside the project root.
 */
export default function createGitIgnore (basePath: string) {
  const gitignore = new LinesFile(basePath, '.gitignore')

  gitignore.add('node_modules')
  gitignore.add('build')
  gitignore.add('coverage')
  gitignore.add('.vscode')
  gitignore.add('.DS_STORE')

  gitignore.commit()
}
