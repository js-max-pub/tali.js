

import settings from '../settings.js'
import { dd2aa, flip } from '../lib/convert.js'
// import { map } from '../../object/mod.js'



export function stringify(dd = {}, options) { // {{}} -> tali
	let aa = dd2aa(dd, options)
	let str = aa2str(aa, options)
	return str
}

function pad(str, len) {
	// console.log('pad', str, len)
	// if (str * 1 == str)
	// 	return str.padStart(len, ' ')
	// else
		return str.padEnd(len, ' ')
}

export function aa2str(aa, options = {}) { // [[]] -> tali
	let none = options.none || settings.none
	let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
	// console.log(aa)
	// log.timer()
	// console.log(aa.map(x => x.map(y => y === undefined ? none : y)))
	// let t0 = Date.now()
	// if (options.addIndexColumn) addIndexColumn(aa, options.addIndexColumn)
	aa = aa.map(x => x
		.map(x => remove?.includes(x) ? undefined : x)
		.map(y => y === undefined ? none : y)
		.map(y =>
			String(y).replaceAll('\t', settings.tab).replaceAll('\n', settings.line).trim()
		)
	)
	aa[0][0] = options.title || ''
	if (options.pretty) {
		let len = flip(aa.map(row => row.map(col => col.length))).map(col => Math.max(...col))
		if (options.pretty == 2) len = len.map(x => Math.ceil(x / 4) * 4)
		console.log('len', len)
		aa = aa.map(row => row.map((col, j) => pad(col, len[j])))
	}
	// if (options.none && string.startsWith(options.none)) string = string.slice(options.none.length)
	// log.debug('stringified', aa.length, 'lines', t0)
	return aa.map(x => x.join('\t')).join('\n')
}




// export function dd2aa(dd, options = {}) { // {{}} -> [[]]
// 	// let t0 = Date.now()
// 	let aa = []
// 	let cols = [...new Set(Object.keys(dd).flatMap(row => Object.keys(dd[row])))] // iterate all rows to find all different column-keys
// 	if (options.sortCols) cols = cols.sort()
// 	for (let row in dd) {
// 		aa.push([row, ...cols.map(col => dd[row][col])])
// 	}
// 	let sortCol = -1
// 	if (options.sortRows) sortCol = 0
// 	if (options.sortCol && cols.indexOf(options.sortCol) != -1) sortCol = cols.indexOf(options.sortCol) + 1
// 	// console.log('SORT---', options.sortCol, ' x ', sortCol, ' x ', sortCol != -1)
// 	if (sortCol != -1) {
// 		// console.log('SORT BY', options.sortCol, ' x ', sortCol)
// 		// console.log('first row', aa[0])
// 		aa = aa.sort((a, b) => a[sortCol] > b[sortCol] ? 1 : (a[sortCol] < b[sortCol] ? -1 : 0))
// 	}
// 	aa.unshift(['', ...cols]) // list of cols is first row
// 	// log.debug('converted', aa.length, 'lines', t0)
// 	if (options.flip) aa = flip(aa)
// 	return aa
// }
