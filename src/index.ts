#!/usr/bin/env node

if (global && global.process) {
	process.on('uncaughtException', error => console.error(`uncaughtException Error ->`, error))
	process.on('unhandledRejection', reason => console.error(`unhandledRejection Error ->`, reason))
}

try {
	const util = require('util')
	Object.assign(util.inspect, {
		defaultOptions: {
			breakLength: Infinity,
			colors: true,
			compact: false,
			depth: 2,
			maxArrayLength: Infinity,
			showHidden: false,
			showProxy: false,
			sorted: true,
		},
	})
	Object.assign(util.inspect, {
		styles: {
			boolean: 'blue',
			date: 'green',
			null: 'red',
			number: 'magenta',
			regexp: 'green',
			special: 'cyan',
			string: 'green',
			symbol: 'grey',
			undefined: 'red',
		},
	})
	// global.inspect = util.inspect
	// console.log(`node-env-dev assigned to util.inspect`)
	// console.log(`████  ${new Date().toLocaleTimeString()}  ████\n`)
} catch {}
