import { Thread } from '../../thread.js/mod.js'
export default new Thread('./mod.js', import.meta.url)


// import * as MOD from './mod.js'

// export class Thread {
// 	constructor() {
// 		this.worker = createInlineWorker()
// 		for (let method in MOD) // add 
// 			this[method] = async (...p) => await this.post(method, ...p)
// 	}

// 	post(...p) {
// 		const channel = new MessageChannel();
// 		this.worker.postMessage(p, [channel.port1]);
// 		return new Promise(resolve => channel.port2.onmessage = event => resolve(event.data[0]));
// 	}

// 	terminate() {
// 		this.worker.terminate()
// 	}
// }




// function createInlineWorker() {
// 	const blob = new Blob(['self.onmessage = ', onMessage.toString()], { type: 'text/javascript' });
// 	const blobURL = URL.createObjectURL(blob);
// 	return new Worker(blobURL, { type: 'module' });
// }


// async function onMessage(event) {
// 	let t0 = Date.now()
// 	let result = await MOD[event.data[0]](...event.data.slice(1))
// 	event.ports[0].postMessage(result)
// 	console.log('[thread.js] post', '(' + event.data[0] + ')', Date.now() - t0, 'ms')
// }

