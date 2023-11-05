// import * as WP from '../../../thread.js/promise.js'
import { Thread } from '../../thread.js'
import * as FS from '../../../../fs/deno/sync.js'

// import {thread3}

let text = FS.file('test1.tali').text

let thread1 = new Thread()

let result1 = await thread1.post('parse', text)
console.log(result1)
thread1.terminate()
