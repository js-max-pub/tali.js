let worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })


export function work(...p) {
	const channel = new MessageChannel();
	// we transfer one of its ports to the Worker thread
	worker.postMessage(p, [channel.port1]);

	return new Promise((res, rej) => {
		// we listen for a message from the remaining port of our MessageChannel
		channel.port2.onmessage = event => res(event.data[1]);
	});
}

