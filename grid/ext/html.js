
// import { DOMParser } from "https://esm.sh/linkedom";

export function str2aaa(text, options) {
	const doc = new DOMParser().parseFromString(text, 'text/html')
	return html2aaa(doc, options)
}

export function html2aaa(node, options) {
	let tables = []
	for (let table of node.querySelectorAll('table')) {
		let aa = parseTable(table, options)
		tables.push(aa)
	}
	return tables
}

function closest(node, search) { // not yet implemented in deno
	if (!node.parentNode) return null
	if (search.split(',').includes(node.nodeName.toLowerCase())) return node
	return closest(node.parentNode, search)
}

function parseTable(table, options) {
	let head = []
	let body = []
	let foot = []
	let rowspans = {}
	let row
	for (let tr of table.querySelectorAll('tr')) {
		[row, rowspans] = parseRow(tr, rowspans, options)
		if (closest(tr, 'thead')) head.push(row)
		else if (closest(tr, 'tfoot')) foot.push(row)
		else body.push(row)
	}
	return [...head, ...body, ...foot]
}

function parseRow(tr, rowspans = {}, options) {
	let row = []
	let i = -1
	for (let td of tr.querySelectorAll('th,td')) {
		i++
		if (rowspans[i]) {
			row.push('||')
			rowspans[i]--
		}
		const val = parseColumn(td, options)
		row.push(val)

		// add colspan-indicators
		const colspan = td.getAttribute('colspan') * 1
		for (let i = 0; i < colspan - 1; i++)
			row.push('==')
		const rowspan = td.getAttribute('rowspan') * 1
		if (rowspan) rowspans[i] = rowspan - 1
	}
	return [row, rowspans]
}

function parseColumn(td, options) {
	let val = [...td.childNodes].filter(x => x.nodeType == 3).map(x => x.textContent).join('').trim() // only text nodes
	if (!val) val = td.innerText
	// let val = td.textContent
	let nsVal = val.replaceAll(/\s/g, '') // no-spaces-value
	if (options.region?.toLowerCase() == 'de') nsVal = nsVal.replaceAll('.', '').replace(',', '.')
	let intVal = nsVal * 1
	if (!isNaN(intVal)) return intVal
	return val
}



// export function aaa2str(aaa, options = {}) {
// 	return aaa
// 		.map(table => table
// 			.map((row, i) => row
// 				.map((cell, j) => `<${(i == 0 || j == 0) ? 'th' : 'td'}>${cell}</${(i == 0 || j == 0) ? 'th' : 'td'}>`)
// 				.join(' ')
// 			)
// 			.map(row => `    <tr> ${row} </tr>\n`)
// 			.join('')
// 		)
// 		.map(table => `<table>\n${table}${options.caption ? '<caption>' + table[0][0] + '</caption>' : ''}</table>\n\n\n`)
// 		.join('')
// }

export function aaa2str(aaa, options = {}) {
	let out = ''
	for (let i in aaa) {
		let table = aaa[i]
		out += `<table>\n`
		for (let j in table) {
			let row = table[j]
			out += `    <tr> `
			for (let k in row) {
				let cell = row[k]
				let cellType = (j == 0 || k == 0) ? 'th' : 'td'
				out += `<${cellType}> `
				if (!(options.caption && j == 0 && k == 0))
					out += cell
				out += ` </${cellType}> `
			}
			out += `<tr>\n`
		}
		if (options.caption)
			out += `<caption>${table[0][0]}</caption>`
		out += `</table>\n\n\n`
	}
	return out
}