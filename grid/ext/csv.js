import { lines, trim } from '../../deps.js'

export function str2aaa(string, options = {}) {
	return [lines(string)
		.map(row => row
			.split(options.delimiter ?? ';')
			.map(cell => trim(cell, options.quotes ?? '"')
			)
		)]
}


export function aa2ad(aa) { // [[]] -> [{}]
	let cols = aa[0]
	let ad = aa.slice(1).map(line =>
		Object.fromEntries(line.map((x, i) => [cols[i], x]))
	)
	return ad
}

export function parse(string, options = {}) {
	let aa = str2aaa(string, options)[0]
	let ad = aa2ad(aa)
	return ad
}