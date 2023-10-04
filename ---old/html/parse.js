import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { aa2dd } from '../lib/convert.js'

export function parse(text, options = {}) {
    let aa = str2aa(text, options)
    // Deno.writeTextFileSync('debug.json', JSON.stringify(aa, 0, 4))
    return aa2dd(aa[0])
}

export function str2aaa(text, options) {
    let tables = []
    const doc = new DOMParser().parseFromString(text, 'text/html')

    for (let table of doc.querySelectorAll('table')) {
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
            row.push('|=|')
            rowspans[i]--
        }
        const val = parseColumn(td, options)
        row.push(val)

        // add colspan-indicators
        const colspan = td.getAttribute('colspan') * 1
        for (let i = 0; i < colspan - 1; i++)
            row.push('-=-')
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
