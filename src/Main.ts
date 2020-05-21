import * as PIXI from 'pixi.js'
import MainMenuStage from './MainMenuStage'
import Stage from './Stage'
import SelectTeamStage from './SelectTeamStage'

export default class Main
{
	app: PIXI.Application

	static instance: Main

	constructor()
	{
		Main.instance = this
		
		this.app = new PIXI.Application(1250, 700)

		document.body.appendChild(this.app.view)
		
		var mainMenuStage = new SelectTeamStage()
		this.showStage(mainMenuStage)
	}

	showStage(stage: Stage)
	{
		this.app.stage.removeChildren()
		this.app.stage.addChild(stage)
	}
	//:3
	
	
}

let main = new Main()
