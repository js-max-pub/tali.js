import { parse } from './grid/parse.js'
import { stringify } from './grid/stringify.js'
import settings from './settings.js'

export const TALI = {
	grid: { parse, stringify },
	settings
}