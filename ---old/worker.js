import * as GRID from './mod.js'
console.log("GRID", GRID)
// console.log('im', import.meta.url)
onmessage = event => {
	console.log(event.data, 'ports', event.ports)
	let result = GRID[event.data[0]](...event.data.slice(1))
	if (event.ports.length)
		event.ports[0].postMessage([event.data[0], result])
	else
		postMessage([event.data[0], result])
}
