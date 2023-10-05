import * as tali from './ext/tali.js'
import * as csv from './ext/csv.js'
import * as html from './ext/html.js'
import { aaa2ddd, ddd2aaa } from './lib/ddd.js'
import settings from '../settings.js'

const EXT = { tali, csv, html }



export function parse(str, options = {}) {
	mergeSettingsAndOptions(options)
	let f = options.format?.toLowerCase() ?? 'tali'
	let aaa = EXT[f].str2aaa(str, options)
	// let aaa = str2aaa(str, options.source, options)
	// if (options.target?.toLowerCase?.() == 'aaa') return aaa
	let ddd = aaa2ddd(aaa, options)
	return ddd
}


export function stringify(ddd, options = {}) {
	mergeSettingsAndOptions(options)
	// console.log('ddd',ddd)
	let aaa = ddd2aaa(ddd, options)
	// console.log('aaa',aaa)
	let f = options.format?.toLowerCase() ?? 'tali'
	let str = EXT[f].aaa2str(aaa, options)
	// let str = aaa2str(aaa, options.target, options)
	return str
}




export function mergeSettingsAndOptions(options) {
	options.parse = { ...settings.parse, ...options.parse }
	options.stringify = { ...settings.stringify, ...options.stringify }
	for (let key in settings)
		if (!(key in options))
			options[key] = settings[key]
	return options
}






// function str2aaa(str, source, options) {
// 	switch (source?.toLowerCase?.()) {
// 		case 'csv': return csv.str2aaa(str, options)
// 		case 'html': return html.str2aaa(str, options)
// 		default: return tali.str2aaa(str, options)
// 	}
// }

// function aaa2str(aaa, target, options) {
// 	// console.log('------aaa2str 11')
// 	switch (target?.toLowerCase?.()) {
// 		// case 'csv': return csv.str2aaa(str, opt)
// 		// case 'html': return html.aaa2str(aaa, opt)
// 		default: return tali.aaa2str(aaa, options)
// 	}
// }
