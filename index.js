#!/usr/bin/env node
const fetch = require('./fetch');


const datetime = {
  alias: 'd',
  default: 20150218230000,
  describe: 'datetime'
};


require('yargs')
  .usage('$0 <cmd> [args]')
  .command(
    'fetch', 'get gdelt by datetime',
    { datetime },
    argv => fetch(argv).pipe(process.stdout)
  )
  .help()
  .argv;
