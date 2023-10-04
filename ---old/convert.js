import { addUniqueColumn, addUniqueRow, uniqueAA } from "./unique.js"


export function flip(aa) {
    let out = []
    for (let i in aa) {
        for (let j in aa[i]) {
            out[j] ??= []
            out[j][i] = aa[i][j]
        }
    }
    return out
}


export function encodeAAA(aaa, options = {}) {
    let none = options.none || settings.none
    let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
    return aaa
        .map(table => table
            .map(row => row
                .map(cell => remove?.includes(cell) ? undefined : cell)
                .map(cell => cell === undefined ? none : cell)
                .map(cell =>
                    String(cell).replaceAll('\t', settings.tab).replaceAll('\n', settings.line).trim()
                )
            )
        )
}
export function decodeAAA(aaa, options = {}) {
    let none = options.none ?? settings.none
    let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
    return aaa
        .map(table => table
            .map(row => row
                .map(cell => (cell == none) ? undefined : cell)
                .map(cell => remove.includes(cell) ? undefined : cell)
            )
        )
}


export function aa2dd(aa, options = {}) { // [[]] -> {{}}
    // Deno.writeTextFileSync('debug.tali.json', JSON.stringify(aa, 0, 4))
    // console.log('start dd')
    // let t0 = Date.now()
    if (options.flip) aa = flip(aa)
    // console.log(aa)
    uniqueAA(aa)
    // addUniqueColumn(aa)
    // // console.log(aa)
    // // aa[0].shift()
    // aa.shift()
    // addUniqueRow(aa)
    // if (!uniqueRow(aa, 0)) aa.unshift()
    let cols = aa[0]
    // console.log(cols)
    let dd = {}
    for (let row of aa.slice(1)) {
        // console.log(row)
        dd[row[0]] = Object.fromEntries(row.map((x, i) => [cols[i], x]).slice(1))
    }
    // log.debug('converted', aa.length, 'lines', t0)
    // console.log('end dd')
    return dd
}



export function dd2aa(dd, options = {}) { // {{}} -> [[]]
    // let t0 = Date.now()
    let aa = []
    let cols = [...new Set(Object.keys(dd).flatMap(row => Object.keys(dd[row])))] // iterate all rows to find all different column-keys
    if (options.sortCols) cols = cols.sort()
    for (let row in dd) {
        aa.push([row, ...cols.map(col => dd[row][col])])
    }
    let sortCol = -1
    if (options.sortRows) sortCol = 0
    if (options.sortCol && cols.indexOf(options.sortCol) != -1) sortCol = cols.indexOf(options.sortCol) + 1
    // console.log('SORT---', options.sortCol, ' x ', sortCol, ' x ', sortCol != -1)
    if (sortCol != -1) {
        // console.log('SORT BY', options.sortCol, ' x ', sortCol)
        // console.log('first row', aa[0])
        aa = aa.sort((a, b) => a[sortCol] > b[sortCol] ? 1 : (a[sortCol] < b[sortCol] ? -1 : 0))
    }
    aa.unshift(['', ...cols]) // list of cols is first row
    // log.debug('converted', aa.length, 'lines', t0)
    if (options.flip) aa = flip(aa)
    return aa
}