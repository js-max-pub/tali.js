// import settings from '../../settings.js'
import { blocks, lines } from '../../deps.js'
import { prettifyAA } from "../lib/aa.js"
import { encodeAAA, decodeAAA } from '../lib/enc.js'


export function str2aaa(string, options = {}) { // tali -> [[]]
	let aaa = blocks(string)
		.map(table => lines(table)
			.filter(row => row.trim())
			.map(row => row.split('\t')
				.map(cell => cell.trim())
			)
		)
	return decodeAAA(aaa, options)
}



export function aaa2str(aaa, options = {}) { // [[]] -> tali
	// aaa[0][0][0] = options.title || ''
	// console.log('aaa2str')
	aaa = encodeAAA(aaa, options)

	if (options.pretty)
		aaa = aaa.map(aa => prettifyAA(aa))
	// Deno.writeTextFileSync('test.json', JSON.stringify(aaa, 0, 4))

	return aaa
		.map(table => table
			.map(row => row
				.join(options.cell)
			).join(options.row)
		).join(options.table)
}





// export function encodeAAA(aaa, options = {}) {
// 	let none = options.none ?? settings.none
// 	let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
// 	// console.log('enc', aaa)
// 	return aaa
// 		.map(table => table
// 			.map(row => row
// 				.map(cell => remove?.includes(cell) ? undefined : cell)
// 				.map(cell => cell === undefined ? none : cell)
// 				.map(cell =>
// 					String(cell).replaceAll('\t', options.tab ?? settings.tab).replaceAll('\n', options.line ?? settings.line)//.trim()
// 				)
// 			)
// 		)
// }


// export function decodeAAA(aaa, options = {}) {
// 	let none = options.none ?? settings.none
// 	let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
// 	return aaa
// 		.map(table => table
// 			.map(row => row
// 				.map(cell => (cell == none) ? undefined : cell)
// 				.map(cell => remove.includes(cell) ? undefined : cell)
// 			)
// 		)
// }

