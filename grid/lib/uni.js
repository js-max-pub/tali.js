// export const isArrayUnique = a => new Set(a).size == a.length
// export const isRowUnique = (aa, n) => isArrayUnique(aa[n])
// export const isColumnUnique = (aa, n) => isArrayUnique(aa.map(x => x[n]))

// add a row with unique column-names to the top of the list
export const addColumnNames = (aa, offset = 1) => aa.unshift(Array(aa[0].length).fill(1).map((x, i) => 'c' + (i * 1 + offset)))

// add a column with a unique name to the top of each row
export const addRowNames = (aa, offset = 1) => aa.map((row, i) => row.unshift('r' + (i * 1 + offset)))


// export function uniqueAA(aa) {
//     const row = isRowUnique(aa, 0)
//     const col = isColumnUnique(aa, 0)
//     if (!row) addUniqueRow(aa)
//     if (!col) addUniqueColumn(aa)
//     if (!row && !col) aa[0].shift()
// }



// export const addUniqueRow = aa => aa.unshift(createUniqueArray(aa[0].length))
// export const addUniqueColumn = aa => aa.map((row, i) => row.unshift(numberToLetter(i)?.toLowerCase()))

// export function createUniqueArray(len) {
//     return Array(len).fill(1).map((x, i) => numberToLetter(i))
// }

// export function numberToLetter(num) {
//     var s = '', t;
//     while (num > 0) {
//         t = (num - 1) % 26;
//         s = String.fromCharCode(65 + t) + s;
//         num = (num - t) / 26 | 0;
//     }
//     return s || '';
// }