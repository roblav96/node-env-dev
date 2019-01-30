
// process.on('uncaughtException', function(error) {
// 	console.error(`████  GLOBAL UNCAUGHT EXCEPTION  ████`)
// 	console.error(`error ->`, error)
// })

// process.on('unhandledRejection', function(reason, promise) {
// 	console.error(`████  GLOBAL UNHANDLED PROMISE REJECTION  ████`)
// 	console.error(`reason ->`, reason)
// 	console.error(`promise ->`, promise)
// 	console.warn(`unhandledRejection invoking process.exit...`)
// 	process.exit(1)
// })

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
	// console.log(`node-env-dev assigned to util.inspect`)
	// console.log(`████  ${new Date().toLocaleTimeString()}  ████\n`)
} catch (error) {
	// console.error(`node-env-dev require catch Error ->`, error)
}
