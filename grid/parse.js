
import settings from '../settings.js'
import { lines } from '../deps.js'
import { flip } from '../lib.js'

export function parse(string = '', options) { // tali -> {{}}
	let aa = str2aa(string, options)
	let dd = aa2dd(aa, options)
	return dd
}


export function str2aa(string, options = {}) { // tali -> [[]]
	let none = options.none ?? settings.none
	let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
	// console.log("REMOVE",remove)
	// let t0 = Date.now()
	// let hasSpecialChars = string.includes(taliN) || string.includes(taliT)
	let aa = lines(string)
		// .split('\n')
		.filter(x => x.trim()) // remove empty lines
		.map(x => x
			.split('\t')
			.map(y =>
				String(y).replaceAll('\t', settings.tab).replaceAll('\r\n', settings.line).replaceAll('\r', settings.line).replaceAll('\n', settings.line).trim()
			)
			.map(y => (y == none) ? undefined : y)
			.map(y => remove.includes(y) ? undefined : y)
		)
	// log.debug('parsed', string.length, 'characters', t0)
	return aa
}


export function aa2dd(aa, options = {}) { // [[]] -> {{}}
	// let t0 = Date.now()
	if (options.flip) aa = flip(aa)
	let cols = aa[0]
	let dd = {}
	for (let row of aa.slice(1)) {
		dd[row[0]] = Object.fromEntries(row.map((x, i) => [cols[i], x]).slice(1))
	}
	// log.debug('converted', aa.length, 'lines', t0)
	return dd
}




