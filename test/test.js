// import { parse } from '../grid/parse.js'
// import { stringify } from '../grid/stringify.js'
import TALI from '../mod.js'

if (import.meta.main) { // tests
	let json, tali

	tali = Deno.readTextFileSync('test1.tali')
	json = TALI.grid.parse(tali, { none: '-' })
	console.log(json)

	json = JSON.parse(Deno.readTextFileSync('test1.json'))
	tali = TALI.grid.stringify(json, { none: '-' })
	console.log(tali)
}