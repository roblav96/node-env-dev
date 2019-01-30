
process.on('uncaughtException', function(error) {
	console.error(
		`████  GLOBAL UNCAUGHT EXCEPTION  ████`,
		`\nerror ->`, error,
	)
})

process.on('unhandledRejection', function(reason, promise) {
	console.error(
		`████  GLOBAL UNHANDLED PROMISE REJECTION  ████\n`,
		`\nreason ->`, reason,
		`\npromise ->`, promise,
	)
	// console.warn(`unhandledRejection invoking process.exit...`)
	// process.exit(1)
})

// let util: any; try { util = require('util') } catch (_) { }
try {
	const { inspect } = require('util')
	Object.assign(inspect, {
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
	Object.assign(inspect, {
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
	Object.assign(global, { inspect })
	// global.inspect = util.inspect
	// console.log(`node-env-dev assigned to util.inspect`)
	// console.log(`████  ${new Date().toLocaleTimeString()}  ████\n`)
} catch (error) {
	// console.error(`node-env-dev require catch Error ->`, error)
}
