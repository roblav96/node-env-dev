#!/usr/bin/env node

import 'source-map-support/register'
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
	global.process.on('uncaughtException', error =>
		console.error(`Uncaught Exception -> %O`, error)
	)
	global.process.on('unhandledRejection', error =>
		console.error(`Unhandled Rejection -> %O`, error)
	)
} catch {}

try {
	exithook(() => inspector.close())

	process.args = mri(process.argv.slice(2))

	let banner = `
	${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}
	      ${ansi.cyan.bold(dayjs().format('hh:mm:ss A'))}
	${ansi.dim('■■■■■■■■■■■■■■■■■■■■■■■')}
	`
	console.log(`\n${banner.replace(/\t/g, '').trim()}\n`)

	let stdout = (console as any)._stdout as NodeJS.WriteStream
	if (stdout.isTTY) {
		stdout.isTTY = false as any
		process.nextTick(() => (stdout.isTTY = true))
	}
	console.clear()

	// setInterval(Function, 1 << 30)
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
