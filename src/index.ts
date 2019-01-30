
import * as util from 'util'

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

console.log(`\n████  ${new Date().toLocaleTimeString()}  ████\n`)
