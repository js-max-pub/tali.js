
import { blocks, lines } from '../deps.js'

export function parse(s) {
    let tsv = lines(s).map(line => line.split('\t'))
    return Object.fromEntries(tsv.map(line=>[line[0],line[1]]))
}

export function stringify(o) {
    return Object.entries(o).map(x=>x.join('\t')).join('\n')
    
}