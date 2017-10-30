#!/usr/bin/env node
const download = require('./download');
const lint = require('./lint');


const datetime = {
  alias: 'd',
  describe: 'datetime [defaults to today]'
};
const format = {
  alias: 'f',
  choices: ['json', 'n3'],
  default: 'json',
  describe: 'output format'
};


require('yargs')
  .usage('$0 <cmd> [args]')
  .command(
    'download', 'download gdelt by datetime',
    { datetime, format },
    argv => download(argv).pipe(process.stdout)
  )
  .command(
    'lint',
    'lint gdelt by datetime',
    { datetime },
    argv => lint(argv).pipe(process.stdout)
  )
  .command(
    'clean',
    'clean cache',
    {},
    require('./clean')
  )
  .demand(1, 'Please specify a command')
  .help()
  .strict()
  .argv;
