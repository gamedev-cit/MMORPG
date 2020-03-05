import * as PIXI from 'pixi.js'
import MainMenuStage from './MainMenuStage'
import Stage from './Stage'

export default class Main
{
	app: PIXI.Application

	static instance: Main

	constructor()
	{
		Main.instance = this
		
		this.app = new PIXI.Application(1280, 700)

		document.body.appendChild(this.app.view)
		
		var mainMenuStage = new MainMenuStage()
		this.showStage(mainMenuStage)
	}

	showStage(stage: Stage)
	{
		this.app.stage.removeChildren()
		this.app.stage.addChild(stage)
	}
	
	
}

let main = new Main()
