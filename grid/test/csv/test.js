// import { parse } from '../grid/parse.js'
// import { stringify } from '../grid/stringify.js'
import { TALI } from '../mod.js'
// import * as CSV from '../csv/parse.js'
// TALI.settings.remove = ['null']



if (import.meta.main) { // tests
	let json, tali

	tali = Deno.readTextFileSync('test1.tali')
	json = TALI.grid.parse(tali, { none: '-' })
	console.log(json)

	console.log('CSV', TALI.grid.parse(tali, { source: 'csv', delimiter: '\t' }))

	json = { t1: JSON.parse(Deno.readTextFileSync('test1.json')) }
	tali = TALI.grid.stringify(json, { none: '-', pretty: 0 })
	console.log(tali)
	tali = TALI.grid.stringify(json, { none: '-', remove: ['nul'], pretty: 1 })
	console.log(tali)
	tali = TALI.grid.stringify(json, { none: '-', remove: ['nul', ''], pretty: 2 })
	console.log(tali)
}