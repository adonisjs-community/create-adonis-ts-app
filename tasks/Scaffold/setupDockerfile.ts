import { join } from 'path'
import { files } from '@adonisjs/sink'
import { TaskFn } from '../../src/Contracts'

const task: TaskFn = (_, logger, { absPath, dockerfile, client }) => {
  if (!dockerfile) {
    return
  }

  const dockerIgnore = new files.NewLineFile(absPath, '.dockerignore')
  dockerIgnore.add([
    'docker-compose.yml',
    '.dockerignore',
    'Dockerfile',
    'build',
    'node_modules',
    '.env',
    '.git',
    '.gitignore',
  ])
  dockerIgnore.commit()
  logger.action('create').succeeded('.dockerignore')

  const template = join(__dirname, '..', '..', 'templates/docker/Dockerfile')
  const outDir = 'Dockerfile'

  const installationCommand = client === 'npm' ? 'npm ci' : 'yarn install --frozen-lockfile'
  const lockFile = client === 'npm' ? 'package-lock.json' : 'yarn.lock'

  const dockerFile = new files.MustacheFile(absPath, outDir, template).apply({
    client,
    installationCommand,
    lockFile,
  })
  dockerFile.overwrite = true
  dockerFile.commit()
  logger.action('create').succeeded(outDir)
}

export default task
