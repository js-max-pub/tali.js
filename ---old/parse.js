
import settings from '../settings.js'
import { blocks, lines } from '../deps.js'
import { aaa2ddd, flip } from '../lib/convert.js'

export function parse(string = '', options) { // tali -> {{}}
	let aaa = str2aaa(string, options)
	aaa = decode(aaa)
	let ddd = aaa2ddd(aa[0], options)
	return dd
}


export function str2aaa(string, options = {}) { // tali -> [[]]
	return blocks(string)
		.map(table => lines(table)
			.filter(row => row.trim())
			.map(row => row.
				split('\t')
			)
		)
}





	// console.log("REMOVE",remove)
	// let t0 = Date.now()
	// let hasSpecialChars = string.includes(taliN) || string.includes(taliT)
	// return lines(string)
	// Deno.writeTextFileSync('debug.tali.txt', string)
	// Deno.writeTextFileSync('debug.tali.2.json', JSON.stringify(lines(string), 0, 4))
	// console.log('size', string.length)


	// console.log('parsed aa')
	// let aa = lines(string)
	// 	// .split('\n')
	// 	.filter(x => x.trim()) // remove empty lines
	// 	.map(x => x
	// 		.split('\t')
	// 		// .map(y => // andersrum
	// 		// 	String(y).replaceAll('\t', settings.tab).replaceAll('\r\n', settings.line).replaceAll('\r', settings.line).replaceAll('\n', settings.line).trim()
	// 		// )
	// 		.map(y => (y == none) ? undefined : y)
	// 		.map(y => remove.includes(y) ? undefined : y)
	// 	)
	// log.debug('parsed', string.length, 'characters', t0)



// export function aa2dd(aa, options = {}) { // [[]] -> {{}}
// 	// let t0 = Date.now()
// 	Deno.writeTextFileSync('debug.tali.json', JSON.stringify(aa, 0, 4))
// 	if (options.flip) aa = flip(aa)
// 	let cols = aa[0]
// 	let dd = {}
// 	for (let row of aa.slice(1)) {
// 		dd[row[0]] = Object.fromEntries(row.map((x, i) => [cols[i], x]).slice(1))
// 	}
// 	// log.debug('converted', aa.length, 'lines', t0)
// 	return dd
// }




