#!/usr/bin/env node
const fetch = require('./fetch');
const lint = require('./lint');


const datetime = {
  alias: 'd',
  default: 20150218230000,
  describe: 'datetime'
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
    'fetch', 'get gdelt by datetime',
    { datetime, format },
    argv => fetch(argv).pipe(process.stdout)
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
  .argv;
