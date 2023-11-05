// import { TALI } from '../../worker.js'
let worker = new Worker(new URL('../../worker.js', import.meta.url), { type: 'module' })

import * as FS from '../../../../fs/deno/sync.js'

let text = FS.file('test1.tali').text

worker.postMessage(['parse', text])

worker.onmessage = event => {
	console.log('result', event.data)
}