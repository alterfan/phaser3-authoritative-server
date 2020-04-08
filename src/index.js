var CANVAS = require('canvas')
const JSDOM = require('jsdom').JSDOM
const Datauri = require('datauri')
const path = require('path')
const datauri = new Datauri()
/**
 *
 *
 * @class PhaserAuthoritativeServer
 *
 *
 * @param {*} server
 * @param {*} io
 * @param {*} port
 */
class PhaserAuthoritativeServer {
	constructor(server, io, port) {
		this.server = server
		this.io = io
		this.port = port || 8080
	}
	async startScene(url, requires, port) {
		const self = this
		this.dom = await JSDOM.fromFile(__dirname + '/index.html', {
			runScripts: 'dangerously',
			resources: 'usable',
			pretendToBeVisual: true,
		})
		this.dom.serialize()
		const window = this.dom.window
		const document = this.dom.window.document
		const _url = path.dirname(require.main.filename) + url
		attachScript(document, _url)
		updateGlobal(window, document)
		window.URL.createObjectURL = function (blob) {
			if (blob)
				return datauri.format(blob.type, blob[Object.getOwnPropertySymbols(blob)[0]]._buffer)
					.content
		}
		window.URL.revokeObjectURL = function (objectURL) {}
		window.Phaser = require('phaser')
		for (const key in requires)
			if (requires.hasOwnProperty(key))
				window[key] = typeof requires[key] !== 'string' ? requires[key] : require(requires[key])
		window.PhaserStartServer = (fn) => {
			this.server.listen(port, () => {
				if (fn != undefined) fn.apply()
				console.info('     Phaser Authoritative Server v0.0.4')
				console.log('     - Port', this.port)
				console.log('     - Scene', url)
			})
		}
		window.io = this.io
	}
}

/**
 *
 *
 * @param {*} window
 * @param {*} document
 */
function updateGlobal(window, document) {
	global.document = document
	global.window = window
	global.Image = CANVAS.Image
	global.window.Element = undefined
	global.navigator = {
		userAgent: 'node',
	}
	global.XMLHttpRequest = function () {}
	global.HTMLCanvasElement = window.HTMLCanvasElement
	global.HTMLVideoElement = window.HTMLVideoElement
}
/**
 *
 *
 * @param {*} document
 * @param {*} url
 */
function attachScript(document, url) {
	const script = document.createElement('script')
	script.src = url
	document.body.appendChild(script)
}
function pas(server, io, port) {
	return new PhaserAuthoritativeServer(server, io, port)
}
module.exports = pas
