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
} as { [K in util.Style]: string })

Object.assign(util.inspect.defaultOptions, {
	breakLength: Infinity,
	colors: true,
	compact: false,
	depth: 2,
	getters: false,
	maxArrayLength: Infinity,
	maxStringLength: Infinity,
	showHidden: false,
	showProxy: false,
	sorted: true,
} as util.InspectOptions)

export function depth(depth = Infinity) {
	Object.assign(util.inspect.defaultOptions, { depth })
}
export function getters(getters = true as 'get' | 'set' | boolean) {
	Object.assign(util.inspect.defaultOptions, { getters })
}

process.DEVELOPMENT = process.env.NODE_ENV == 'development'
process.on('uncaughtException', (error: Error, origin: string) => {
	console.error(`${ansi.red.bold('[UNCAUGHT EXCEPTION]')}\n%O`, toCleanStack(error))
})
process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
	console.error(`${ansi.red.bold('[UNHANDLED REJECTION]')}\n%O`, toCleanStack(reason))
})
function toCleanStack(error: Error) {
	if (util.isObject(error) && util.isString(error.stack)) {
		let stack = cleanStack(error.stack)
		if (util.isString(stack) && stack.trim()) {
			Object.assign(error, { stack })
		}
	}
	return error
}

if (inspector.url()) {
	inspector.waitForDebugger()
	let timeout = setInterval(Function, 1 << 30)
	exithook(() => clearTimeout(timeout))
	exithook(() => inspector.close())
}
if (process.env.NODE_ENV == 'development') {
	let now = dayjs().format('hh:mm:ss A')
	console.log(`\n${ansi.dim('████  ')}${ansi.cyan.bold(now)}${ansi.dim('  ████')}\n`)
}
if (inspector.url()) {
	inspector.console.clear()
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
declare module 'inspector' {
	var console: Console
}
