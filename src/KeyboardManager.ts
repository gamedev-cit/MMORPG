import * as PIXI from 'pixi.js'

export default class KeyboardManager
{
	keys = new Map<string, boolean>()

    constructor()
    {
		window.addEventListener("keydown", (event: KeyboardEvent) => this.onKeyDown(event))
		window.addEventListener("keyup", (event: KeyboardEvent) => this.onKeyUp(event))
	}
	
	isDown(keyCode: string): boolean
	{
		return this.keys.get(keyCode) || false
	}

    onKeyDown(event: KeyboardEvent)
    {
		this.keys.set(event.code, true)
    }

    onKeyUp(event: KeyboardEvent)
    {
        this.keys.set(event.code, false)
    }

}