#!/usr/bin/env node

import * as ansi from 'ansi-colors'
import * as dayjs from 'dayjs'
import * as inspector from 'inspector'
import * as mri from 'mri'
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
		console.error(`[Uncaught Exception]`, `origin -> %O`, origin, `error -> %O`, error),
	)
	global.process.on('unhandledRejection', (reason, promise) =>
		console.error(`[Unhandled Rejection]`, `reason -> %O`, reason, `promise -> %O`, promise),
	)
} catch {}

try {
	process.args = mri(process.argv.slice(2))

	let banner = `${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}
	      ${ansi.cyan.bold(dayjs().format('hh:mm:ss A'))}
	${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}`
	console.log(`\n${banner.replace(/\t/g, '').trim()}\n`)

	if (inspector.url()) {
		setInterval(Function, 1 << 30)
		exithook(() => inspector.close())
		let stdout = (console as any)._stdout as NodeJS.WriteStream
		if (stdout.isTTY) {
			stdout.isTTY = false as any
			process.nextTick(() => (stdout.isTTY = true))
		}
		console.clear()
	}
} catch {}

declare global {
	var process: NodeJS.Process
	namespace NodeJS {
		interface Process {
			DEVELOPMENT: boolean
			args: mri.Argv
		}
		interface ProcessEnv {
			NODE_ENV: string
		}
	}
}
