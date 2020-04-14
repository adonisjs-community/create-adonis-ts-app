/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { files, logger } from '@adonisjs/sink'
import { TaskFn } from '../src/contracts'

/**
 * Creates `.editorconfig` inside the project root.
 */
const task: TaskFn = (absPath) => {
  const editorConfig = new files.IniFile(absPath, '.editorconfig')

  editorConfig.set('*', {
    indent_style: 'space',
    indent_size: 2,
    end_of_line: 'lf',
    charset: 'utf-8',
    trim_trailing_whitespace: true,
    insert_final_newline: true,
  })

  editorConfig.set('*.json', {
    insert_final_newline: 'ignore',
  })

  editorConfig.set('*.md', {
    trim_trailing_whitespace: false,
  })

  editorConfig.commit()
  logger.create('.editorconfig')
}

export default task
