import { parse } from '../html/parse.js'
import { TALI } from '../mod.js'

let url = Deno.args[0]

const text = await fetch(url).then(x => x.text())
const filename = url.replace(/[^a-zA-Z0-9]/g, '_').replaceAll('__', '_')
let tables = parse(text, { region: 'de' })
try { Deno.mkdirSync('html') } catch { }
Deno.writeTextFileSync(`html/${filename}.json`, JSON.stringify(tables, 0, 4))
Deno.writeTextFileSync(`html/${filename}.tali`, TALI.grid.stringify(tables))
