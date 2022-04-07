import { parse } from '../grid/parse.js'
import { stringify } from '../grid/stringify.js'

if (import.meta.main) { // tests
	let json, tali

	tali = Deno.readTextFileSync('test1.tali')
	json = parse(tali, { none: '-' })
	console.log(json)

	json = JSON.parse(Deno.readTextFileSync('test1.json'))
	tali = stringify(json, { none: '-' })
	console.log(tali)
}