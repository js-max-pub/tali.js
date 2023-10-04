import { addRowNames, addColumnNames } from "./uni.js"

import { flipAA } from "./aa.js"

export function aaa2ddd(aaa, options = {}) { // [[[]]] -> {{{}}}
	let tables = {}
	for (let i in aaa) {
		let tableName = aaa[i][0][0]
		if (!tableName || options.addTableNames) tableName = ('t' + (i * 1 + 1))
		tables[tableName] = aa2dd(aaa[i], options)
	}
	return tables
}

export function aa2dd(aa, options = {}) { // [[]] -> {{}}
	// uniqueAA(aa)
	if (options.addRowNames) addRowNames(aa)
	if (options.addColumnNames) addColumnNames(aa, options.addRowNames ? 0 : 1)
	let cols = aa[0]
	let dd = {}
	for (let row of aa.slice(1)) {
		dd[row[0]] = Object.fromEntries(row.map((x, i) => [cols[i], x]).slice(1))
	}
	return dd
}



export function ddd2aaa(ddd, options = {}) { // {{}} -> [[]]
	let aaa = []
	for (let tableName in ddd) {
		let aa = dd2aa(ddd[tableName], options)
		aa[0][0] = tableName
		aaa.push(aa)
	}
	return aaa
}
export function dd2aa(dd, options = {}) { // {{}} -> [[]]
	// let t0 = Date.now()
	// console.log(dd, options)
	let aa = []
	// let t0 = Date.now()
	let cols = [...new Set(Object.keys(dd).flatMap(row => Object.keys(dd[row])))] // iterate all rows to find all different column-keys
	// console.log(Date.now() - t0, 'cols', cols)
	if (options.sortCols) cols = cols.sort()
	if (Array.isArray(options.sortCols)) cols = options.sortCols
	for (let row in dd) {
		aa.push([row, ...cols.map(col => dd[row][col])])
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
	// log.debug('converted', aa.length, 'lines', t0)
	if (options.flip) aa = flipAA(aa)
	return aa
}