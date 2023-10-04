
export function encodeAAA(aaa, options = {}) {
	// let none = options.none ?? settings.none
	// let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
	return aaa
		.map(table => table
			.map(row => row
				// .map(cell => remove?.includes(cell) ? undefined : cell)
				// .map(cell => cell === undefined ? none : cell)
				.map(cell => cell in options.stringify ? options.stringify[cell] : cell)
				.map(cell =>
					String(cell).replaceAll('\t', options.tab).replaceAll('\n', options.line).trim()
				)
			)
		)
}


export function decodeAAA(aaa, options = {}) {
	// let none = options.none ?? settings.none
	// let remove = [...(options.remove ?? []), ...(settings.remove ?? [])]
	console.log(options)
	return aaa
		.map(table => table
			.map(row => row
				// .map(cell => (cell == none) ? undefined : cell)
				// .map(cell => remove.includes(cell) ? undefined : cell)
				.map(cell => cell in options.parse ? options.parse[cell] : cell)
			)
		)
}

