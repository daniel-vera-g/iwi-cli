#!/usr/bin/env node

const yargs = require('yargs');

// Describe parameters, examples, aliases,...
const args = yargs
	.usage('Usage: iwi-cli <command> [options]')
	.command(require('../lib/mensa/mensa'))
	.command(require('../lib/rooms'))
	.example('iwi-cli mensa', 'Get the mensa plan for the current day')
	.example('iwi-cli mensa --veg', 'Get the mensa plan only including vegetarian dishes')
	.demandCommand(1, 'You need at least one command before moving on')
	.help('h')
	.alias('h', 'help')
	.epilogue('for more information, check out the official IWI web-app at https://iwi-i-info.firebaseapp.com/').argv;
