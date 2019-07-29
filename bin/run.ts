#!/usr/bin/env node

import { bgRed, red } from 'kleur'
import { runTasks } from '../index'

const argv = process.argv.slice(2)
if (argv.length > 0) {
  runTasks(argv[0])
} else {
  console.log(bgRed('Error'))
  console.log(red('Please specify project name'))
}
