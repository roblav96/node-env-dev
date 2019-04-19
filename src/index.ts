#!/usr/bin/env node

import 'source-map-support/register'

function onerror(message: string, error: Error) {
	if (typeof error == 'object' && error.toString) {
		message += ` ${error.toString()}`
	}
	console.error(`${message} -> %O`, error)
}

if (typeof global == 'object' && global.process) {
	process.on('uncaughtException', (error: Error) => onerror('Uncaught Exception', error))
	process.on('unhandledRejection', (error: Error) => onerror('Unhandled Rejection', error))
}

try {
	const util = require('util')
	Object.assign(util.inspect.defaultOptions, {
		breakLength: Infinity,
		colors: true,
		compact: false,
		depth: 2,
		maxArrayLength: Infinity,
		showHidden: false,
		showProxy: false,
		sorted: true,
	})
	Object.assign(util.inspect.styles, {
		boolean: 'blue',
		date: 'green',
		null: 'red',
		number: 'magenta',
		regexp: 'green',
		special: 'cyan',
		string: 'green',
		symbol: 'grey',
		undefined: 'red',
	})
	// global.inspect = util.inspect
	// console.log(`node-env-dev assigned to util.inspect`)
	// console.log(`████  ${new Date().toLocaleTimeString()}  ████\n`)
} catch {}
