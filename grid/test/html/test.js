import { parse } from '../html/parse.js'
import { TALI } from '../mod.js'
// const text = await fetch('https://www.destatis.de/DE/Themen/Wirtschaft/Aussenhandel/Tabellen/erdgas-jaehrlich.html').then(x => x.text())
// Deno.writeTextFileSync('test.txt', text)

let src = Deno.args[0] ?? 'file'

let text = ''
if (src == 'file')
    text = Deno.readTextFileSync('test.html')
else
    text = await fetch('https://www.destatis.de/DE/Themen/Wirtschaft/Aussenhandel/Tabellen/erdgas-jaehrlich.html').then(x => x.text())

let tables = parse(text, { region: 'de' })
Deno.writeTextFileSync(`test.html.json`, JSON.stringify(tables, 0, 4))
Deno.writeTextFileSync(`test.html.tali`, TALI.grid.stringify(tables))
