

export function flipAA(aa) {
	let out = []
	for (let i in aa) {
		for (let j in aa[i]) {
			out[j] ??= []
			out[j][i] = aa[i][j]
		}
	}
	return out
}




export function prettifyAA(aa, options = {}) {
	// console.log('prettify',aa)
	let maxColumnLengths = flipAA(aa.map(row => row.map(col => String(col ?? '').length))).map(col => Math.max(...col))
	// console.log('max col', maxColumnLengths)
	if (options.pretty > 1) maxColumnLengths = maxColumnLengths.map(x => Math.ceil(x / options.pretty) * options.pretty)
	return aa.map(row => row.map((col, j) => pad(col, maxColumnLengths[j])))
}

export function pad(str, len) {
	// console.log('pad', str, len, '|' + (String(str ?? '')?.padEnd?.(len, ' ') ?? '') + '|')
	if (str * 1 == str)
		return String(str ?? '')?.padStart(len, ' ') ?? ''
	// else
	return String(str ?? '')?.padEnd?.(len, ' ') ?? ''
}
