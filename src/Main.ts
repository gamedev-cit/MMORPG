import * as PIXI from 'pixi.js'

export default class Main
{
	app: PIXI.Application

	static instance: Main

	constructor()
	{
		Main.instance = this
		
		this.app = new PIXI.Application(1280, 700)

		document.body.appendChild(this.app.view)
	}
}

let main = new Main()
