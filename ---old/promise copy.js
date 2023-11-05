import { work } from '../../promise.js'

import * as FS from '../../../../fs/deno/sync.js'

let text = FS.file('test1.tali').text

let result = await work('parse', text)

console.log(result)