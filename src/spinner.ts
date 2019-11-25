/*
* create-adonis-ts-app
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Ora } from 'ora'
import cliWidth from 'cli-width'
import { yellow, dim } from 'kleur'

/**
 * Getting width of the stdout to put log messages
 * in one line
 */
const WIDTH = cliWidth()

/**
 * Log installing dependencies message
 */
export function logInstall (list: string[], spinner: Ora, dev: boolean) {
  const dependencies: string[] = []
  const spaceBetweenDependencies = 2

  let widthConsumed = 17 + 15

  for (let dependency of list) {
    if ((widthConsumed + dependency.length + spaceBetweenDependencies) > WIDTH) {
      break
    }

    /**
     * Increase the width consumed
     */
    widthConsumed += dependency.length + spaceBetweenDependencies

    /**
     * Add dependency to the named dependencies
     */
    dependencies.push(dependency)
  }

  /**
   * Total number of out of bound dependencies
   */
  const outOfBounds = list.length - dependencies.length

  if (outOfBounds === 1 && list[list.length - 1].length <= 13) {
    dependencies.push(list[list.length - 1])
  } else if (outOfBounds > 0) {
    dependencies.push(`and ${outOfBounds} other${outOfBounds !== 1 ? 's' : ''}`)
  }

  const suffix = dim(`${dev ? '[dev]' : '[prod]'}`)
  spinner.text = ` ${yellow('install')}   ${dependencies.join(', ')} ${suffix}`
  spinner.spinner = 'dots'
  spinner.color = 'gray'
  spinner.start()
}
