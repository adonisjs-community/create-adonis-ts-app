/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { logger } from '@adonisjs/sink'
import type { SupportedPackageManager } from '../Helpers'

/**
 * Text to show on the help screen. Its simple and hence writing it
 * by hand is fine
 */
export const getHelp = (packageManager: SupportedPackageManager) => {
  const runSentence =
    packageManager === 'yarn'
      ? 'yarn create adonis-ts-app'
      : packageManager === 'pnpm'
      ? 'pnpm init adonis-ts-app'
      : 'npm init adonis-ts-app'

  return `${logger.colors.green(runSentence)} ${logger.colors.dim('<project-name>')}

${logger.colors.yellow().bold('Options')}
${logger.colors.green('--boilerplate')} ${logger.colors.dim(
    '[api, web, slim]'
  )}    ${logger.colors.dim('Select the project boilerplate')}
${logger.colors.green('--name')} ${logger.colors.dim(
    '<string>'
  )}                   ${logger.colors.dim('Specify application name')}
${logger.colors.green('--eslint')} ${logger.colors.dim(
    '<boolean>'
  )}                ${logger.colors.dim('Enable/disable eslint setup')}
${logger.colors.green('--prettier')} ${logger.colors.dim(
    '<boolean>'
  )}              ${logger.colors.dim('Enable/disable prettier setup')}
${logger.colors.green('--encore')} ${logger.colors.dim(
    '<boolean>'
  )}                ${logger.colors.dim('Enable/disable encore setup')}
${logger.colors.green('--debug')} ${logger.colors.dim(
    '<boolean>'
  )}                 ${logger.colors.dim('Turn on the debug mode')}`
}
