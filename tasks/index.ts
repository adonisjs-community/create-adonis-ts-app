/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import formatSource from './FormatSource'
import setupEslint from './Scaffold/setupEslint'
import generateManifest from './GenerateManifest'
import createRcFile from './Scaffold/createRcFile'
import configurePackages from './ConfigurePackages'
import setupPrettier from './Scaffold/setupPrettier'
import copyTemplates from './Scaffold/copyTemplates'
import createTsConfig from './Scaffold/createTsConfig'
import installDependencies from './InstallDependencies'
import createGitIgnore from './Scaffold/createGitIgnore'
import createEditorConfig from './Scaffold/createEditorConfig'
import configureWebpackEncore from './ConfigureEncore'
import { CliState } from '../src/Contracts'

/**
 * An array of tasks to be executed in chronological order
 */
export const tasks = function ({ encore }: CliState) {
  return [
    {
      title: 'Scaffold project',
      actions: [
        copyTemplates,
        createEditorConfig,
        createGitIgnore,
        createRcFile,
        createTsConfig,
        setupEslint,
        setupPrettier,
      ],
    },
    {
      title: 'Install dependencies',
      actions: [installDependencies],
    },
    {
      title: 'Configure installed packages',
      actions: [configurePackages, generateManifest, formatSource],
    },
    ...(encore
      ? [
          {
            title: 'Configure webpack encore',
            actions: [configureWebpackEncore],
          },
        ]
      : []),
  ]
}
