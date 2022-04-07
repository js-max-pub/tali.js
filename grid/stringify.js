

import { taliT, taliN } from '../base.js'
import { Log } from '../../log/mod.js'
const log = new Log('TALI')



export function stringify(DD = {}, options) { // {{}} -> tali
	let aa = dd2aa(DD, options)
	// console.log('aa', aa)
	let str = aa2str(aa, options)
	return str
}



export function dd2aa(dd, options = {}) { // {{}} -> [[]]
	let t0 = Date.now()
	let aa = []
	let cols = [...new Set(Object.keys(dd).flatMap(row => Object.keys(dd[row])))] // iterate all rows to find all different column-keys
	if (options.sortCols) cols = cols.sort()
	for (let row in dd) {
		aa.push([row, ...cols.map(col => dd[row][col] ?? '')])
	}
	let sortCol = -1
	if (options.sortRows) sortCol = 0
	if (options.sortCol && cols.indexOf(options.sortCol) != -1) sortCol = cols.indexOf(options.sortCol) + 1
	// console.log('SORT---', options.sortCol, ' x ', sortCol, ' x ', sortCol != -1)
	if (sortCol != -1) {
		// console.log('SORT BY', options.sortCol, ' x ', sortCol)
		// console.log('first row', aa[0])
		aa = aa.sort((a, b) => a[sortCol] > b[sortCol] ? 1 : (a[sortCol] < b[sortCol] ? -1 : 0))
	}
	aa.unshift(['', ...cols]) // list of cols is first row
	log.debug('converted', aa.length, 'lines', t0)
	return aa
}



export function aa2str(aa, options = {}) { // [[]] -> tali
	// console.log(aa)
	// log.timer()
	let t0 = Date.now()
	if (options.addIndexColumn) addIndexColumn(aa, options.addIndexColumn)
	let string = aa
		.map(x => x
			.map(y => y ? y : (options.none || ''))
			.map(y =>
				String(y).replaceAll('\t', taliT).replaceAll('\n', taliN).trim()
			)
			.join('\t')
		)
		.join('\n')
	log.debug('stringified', aa.length, 'lines', t0)
	return string
}