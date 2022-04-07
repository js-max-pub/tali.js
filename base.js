export { lines, trim } from '../string/mod.js'

// import { Log } from '../../log/mod.js'
// export const log = new Log('TALI')


export const taliT = '|T|' // 90 degree-rotation makes it look like ⇥ \t   forward till stop
export const taliN = '|L|' // 90 degree-rotation makes it look like ↵  \r \n  return than down
// export const taliT = '⇥'
// export const taliN = '↵'



export function addIndexColumn(aa, pattern) {
	console.log('add index column with pattern', pattern, aa.length)
	aa = aa.filter(x => x.join('').trim())
	let ids = ID.many(pattern, aa.length)
	ids.unshift('')
	// console.log('ids', ids)
	for (let i in aa)
		aa[i].unshift(ids[i])
	return aa
}