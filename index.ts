/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { ensureDirSync } from 'fs-extra'
import { bgRed, red } from 'kleur'
import { isAbsolute, join, basename } from 'path'
import { Application } from '@poppinss/application'
import { executeInstructions, isEmptyDir } from '@adonisjs/sink'
import createRcFile from './tasks/createRcFile'
import createEnvFile from './tasks/createEnvFile'
import createPackageFile from './tasks/createPackageFile'
import createGitIgnore from './tasks/createGitIgnore'
import createTsConfig from './tasks/createTsConfig'
import createTsLint from './tasks/createTslint'
import copyTemplates from './tasks/copyTemplates'
import createEditorConfig from './tasks/createEditorConfig'

/**
 * Running all the tasks to create a new project.
 */
export async function runTasks (projectRoot: string) {
  const application = new Application(projectRoot, {} as any, {}, {})
  const absPath = isAbsolute(projectRoot) ? projectRoot : join(process.cwd(), projectRoot)

  /**
   * Create directory if missing
   */
  ensureDirSync(absPath)

  /**
   * Ensure that directory is empty
   */
  const isEmpty = isEmptyDir(absPath)
  if (!isEmpty) {
    console.log(bgRed(`Error`))
    console.log(red(`- Cannot overwrite existing contents in {${projectRoot}} directory`))
    console.log(red(`- Make sure that {${projectRoot}} directory is empty`))
    return
  }

  /**
   * Pulling the project name from the project root path
   */
  const projectName = basename(absPath)

  /**
   * Creating the `.adonisrc.json` file
   */
  createRcFile(absPath, application)

  /**
   * Creating the `.env` file
   */
  createEnvFile(absPath)

  /**
   * Creating the `.gitignore` file
   */
  createGitIgnore(absPath)

  /**
   * Creating the `.editorconfig` file
   */
  createEditorConfig(absPath)

  /**
   * Creating `tsconfig.json` file
   */
  createTsConfig(absPath)

  /**
   * Creating `tslint.json` file
   */
  createTsLint(absPath)

  /**
   * Creating `package.json` file and install required dependencies
   */
  createPackageFile(absPath, projectName)

  /**
   * Copy application templates
   */
  copyTemplates(absPath)

  /**
   * Executing instructions from `@adonisjs/core`. Please check the package
   * repo to see the actions executed there
   */
  await executeInstructions('@adonisjs/core', absPath, application)
}
