#!/usr/bin/env node

import 'source-map-support/register'

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
} catch {}

try {
	const util = require('util')
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
} catch {}

function onerror(message: string, error: Error) {
	// if (typeof error == 'object' && typeof error.toString == 'function') {
	// 	message += ` ${error.toString()}`
	// }
	console.error(`${message} -> %O`, error)
}
if (typeof global == 'object' && typeof global.process == 'object') {
	global.process.DEVELOPMENT = global.process.env.NODE_ENV == 'development'
	global.process.on('uncaughtException', (error: Error) => onerror('Uncaught Exception', error))
	global.process.on('unhandledRejection', (error: Error) => onerror('Unhandled Rejection', error))
}
declare global {
	namespace NodeJS {
		interface Process {
			DEVELOPMENT: boolean
		}
		interface ProcessEnv {
			NODE_ENV: string
		}
	}
}
