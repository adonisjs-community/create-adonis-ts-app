#!/usr/bin/env node

import { bgRed, red } from 'kleur'
import { runTasks } from '../index'

const argv = process.argv.slice(2)
if (argv.length > 0) {
  runTasks(argv[0])
} else {
  console.error(bgRed('Error'))
  console.error(red('Please specify project name'))
}
