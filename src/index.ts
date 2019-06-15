#!/usr/bin/env node

import 'source-map-support/register'

setInterval(Function, 1 << 30)

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

try {
	global.process.DEVELOPMENT = global.process.env.NODE_ENV == 'development'
	global.process.on('uncaughtException', (error: Error) =>
		console.error(`Uncaught Exception -> %0`, error)
	)
	global.process.on('unhandledRejection', (error: Error) =>
		console.error(`Unhandled Rejection -> %0`, error)
	)
} catch {}

try {
	let isNodeJS = new Function('try { return this === global; } catch(e) { return false }')()
	if (isNodeJS) {
		let stdout = (console as any)._stdout as NodeJS.WriteStream
		if (stdout.isTTY) {
			stdout.isTTY = false as any
			process.nextTick(() => (stdout.isTTY = true))
		}
		console.clear()
	}
} catch {}

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
