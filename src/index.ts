#!/usr/bin/env node

import * as sourceMapSupport from 'source-map-support'
sourceMapSupport.install({
	handleUncaughtExceptions: false,
})

import * as ansi from 'ansi-colors'
import * as cleanStack from 'clean-stack'
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
	process.DEVELOPMENT = process.env.NODE_ENV == 'development'
	process.on('uncaughtException', (error: Error, origin: string) => {
		if (error.stack) Object.assign(error, { stack: cleanStack(error.stack) })
		console.error(`${ansi.red.bold('[UNCAUGHT EXCEPTION]')}\n%O`, error)
	})
	process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
		if (reason.stack) Object.assign(reason, { stack: cleanStack(reason.stack) })
		console.error(`${ansi.red.bold('[UNHANDLED REJECTION]')}\n%O`, reason)
	})
} catch {}

try {
	if (process.env.NODE_ENV == 'development') {
		let banner = `${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}
		      ${ansi.cyan.bold(dayjs().format('hh:mm:ss A'))}
		${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}`
		console.log(`\n${banner.replace(/\t/g, '').trim()}\n`)
	}

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

export function depth(depth = Infinity) {
	Object.assign(util.inspect.defaultOptions, { depth })
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
