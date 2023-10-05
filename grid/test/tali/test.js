// import { parse } from '../grid/parse.js'
// import { stringify } from '../grid/stringify.js'
import { TALI } from '../../../mod.js'
// import * as CSV from '../csv/parse.js'
// TALI.settings.remove = ['null']
import * as FS from '../../../../fs/deno/sync.js'

let results = FS.folder('_results').make

if (import.meta.main) { // tests
	// let json, tali
	results.file('test1a.json').json = TALI.grid.parse(FS.file('test1.tali').text)
	results.file('test1b.json').json = TALI.grid.parse(FS.file('test1.tali').text, { parse: { '-': null } })
	results.file('test1c.json').json = TALI.grid.parse(FS.file('test1.tali').text, { parse: { '-': undefined, 'null': undefined, '': undefined } })


	let data = TALI.grid.parse(FS.file('test1.tali').text)
	data.t1.B.b = NaN
	// console.log('data',data.t1)
	results.file('test1a.tsv').text = TALI.grid.stringify(data)
	results.file('test1.p1.tsv').text = TALI.grid.stringify(data, { pretty: 1 })
	results.file('test1.p2.tsv').text = TALI.grid.stringify(data, { pretty: 2 })

	results.file('test1.p2.html').text = TALI.grid.stringify(data, { format: 'html', caption: true })
	// json.t1.A.a = 5
	// json = { t1: JSON.parse(Deno.readTextFileSync('test1.json')) }
	// tali = TALI.grid.stringify(json, { none: '-', pretty: 0 })
	// // console.log(tali, '\n\n')
	// Deno.writeTextFileSync('temp/test1.tali', tali)
	// tali = TALI.grid.stringify(json, { none: '-', pretty: 1 })
	// // console.log(tali, '\n\n')
	// tali = TALI.grid.stringify(json, { none: '-', remove: ['nul', ''], pretty: 2 })
	// // console.log(tali, '\n\n')
	// Deno.writeTextFileSync('temp/test1.nice.tali', tali)
}