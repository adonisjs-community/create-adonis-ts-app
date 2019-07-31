/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { bgRed, red } from 'kleur'
import { ensureDirSync } from 'fs-extra'
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
    console.error(bgRed(`Error`))
    console.error(red(`- Cannot overwrite existing contents in {${projectRoot}} directory`))
    console.error(red(`- Make sure that {${projectRoot}} directory is empty`))
    process.exit(1)
  }

  try {
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
     * Executing instructions from `@adonisjs/core` and `@adonisjs/bodyparser`.
     * Please check the packages repos to see the actions executed there.
     */
    await executeInstructions('@adonisjs/core', absPath, application)
    await executeInstructions('@adonisjs/bodyparser', absPath, application)
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
