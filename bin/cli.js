#!/usr/bin/env node

var argv = require('minimist')(
    process.argv.slice(2)
);

argv.cwd = process.cwd();

argv.src = './src';
argv.dist = './dist';

require('../lib/index')(argv);