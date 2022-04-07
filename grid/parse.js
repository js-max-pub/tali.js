
import { taliT, taliN, lines } from '../base.js'


export function parse(string = '', options) { // tali -> {{}}
	let aa = str2aa(string, options)
	let dd = aa2dd(aa, options)
	return dd
}


export function str2aa(string, options = {}) { // tali -> [[]]
	// let t0 = Date.now()
	// let hasSpecialChars = string.includes(taliN) || string.includes(taliT)
	let aa = lines(string)
		// .split('\n')
		.filter(x => x.trim())
		.map(x => x
			.split('\t')
			.map(y =>
				String(y).replaceAll('\t', taliT).replaceAll('\n', taliN).trim()
			)
			.map(y => (y == options.none) ? undefined : y)
		)
	// log.debug('parsed', string.length, 'characters', t0)
	return aa
}


export function aa2dd(aa) { // [[]] -> {{}}
	// let t0 = Date.now()
	let cols = aa[0]
	let dd = {}
	for (let row of aa.slice(1)) {
		dd[row[0]] = Object.fromEntries(row.map((x, i) => [cols[i], x]).slice(1))
	}
	// log.debug('converted', aa.length, 'lines', t0)
	return dd
}




