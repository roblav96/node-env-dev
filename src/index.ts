#!/usr/bin/env node

require('source-map-support').install({ handleUncaughtExceptions: false })
import * as ansi from 'ansi-colors'
import * as dayjs from 'dayjs'
import * as inspector from 'inspector'
import * as util from 'util'
import exithook = require('exit-hook')

try {
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
	Object.assign(util.inspect.styles, {
		bigint: 'magenta',
		boolean: 'blue',
		date: 'green',
		module: 'underline',
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
	global.process.on('uncaughtException' as any, (error, origin) =>
		console.error(`[UNCAUGHT EXCEPTION] origin -> '${origin}' %O`, error),
	)
	global.process.on('unhandledRejection', error =>
		console.error(`[UNHANDLED REJECTION] %O`, error),
	)
} catch {}

try {
	let banner = `${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}
	      ${ansi.cyan.bold(dayjs().format('hh:mm:ss A'))}
	${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}`
	console.log(`\n${banner.replace(/\t/g, '').trim()}\n`)

	if (inspector.url()) {
		let timeout = setInterval(Function, 1 << 30)
		exithook(() => clearTimeout(timeout))
		exithook(() => inspector.close())
		let stdout = (console as any)._stdout as NodeJS.WriteStream
		if (stdout.isTTY == true) {
			stdout.isTTY = false
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
