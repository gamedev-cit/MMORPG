import * as PIXI from 'pixi.js'
import Main from './Main'

export default class Stage extends PIXI.Container
{
	constructor()
	{
		super()
    	this.on("added", this.onAdded, this)
		this.on("removed", this.onRemoved, this)
	}

	onAdded()
	{
		Main.instance.app.ticker.add(this.update, this)
	}

	onRemoved()
	{
		Main.instance.app.ticker.remove(this.update, this)
	}

	update()
	{
		
	}
}