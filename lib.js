



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