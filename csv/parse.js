import { lines, trim } from '../deps.js'

export function parse(text, delimiter = ';', quotes = '"') {
	let t0 = Date.now()
	// let table = CSV.toAD(text)  // csv parser not working for some reason...
	let table = lines(text).map(x => x.split(delimiter).map(x => trim(x, quotes)))
	table = aa2ad(table)
	// log.debug('finished parsing', Object.keys(table).length, 'lines', t0)
	return table
}
// export function loadTSV(text) {
// 	return loadCSV(text, '\t')
// }


export function aa2ad(aa) { // [[]] -> [{}]
	// console.log('aa',aa)
	// log.timer()
	// let t0 = Date.now()
	let cols = aa[0]
	// console.log('cols',cols)
	// if (cols?.[0] === '') cols[0] = 'index'
	// console.log('cols',cols)
	let ad = aa.slice(1).map(line =>
		Object.fromEntries(line.map((x, i) => [cols[i], x]))
	)
	// log.debug('parsed', aa.length, 'entries', t0)
	return ad
}