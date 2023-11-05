// import * as WP from '../../../thread.js/promise.js'
import { Thread } from '../../../../thread.js/mod.js'
import * as FS from '../../../../fs/deno/sync.js'

// import {thread3}

let text = FS.file('test1.tali').text

let thread1 = new Thread('../../mod.js', import.meta.url)
let thread2 = await new Thread('../../mod.js', import.meta.url).init()


let result1 = await thread1.post('parse', text)
console.log(result1)
thread1.terminate()


let result2 = await thread2.parse(text)
console.log(result2)
thread2.terminate()





