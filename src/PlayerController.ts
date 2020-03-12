import Character from "./Character";
import GameStage from "./GameStage";
import KeyboardManager from "./KeyboardManager";
import MouseManager from "./MouseManager";
import Main from "./Main";

export default class PlayerController
{
	player: Character

	keyboardManager = new KeyboardManager()
	mouseManager = new MouseManager(GameStage.instance)

	constructor(player: Character)
	{
		this.player = player

		Main.instance.app.ticker.add(this.update, this)
	}

	update()
	{
        this.player.speedX = this.player.speedX * 0.8
        this.player.speedY = this.player.speedY * 0.8

		if (this.keyboardManager.isDown("ArrowRight") || this.keyboardManager.isDown("KeyD")) {
			this.player.speedX = 2
		}

		if (this.keyboardManager.isDown("ArrowLeft") || this.keyboardManager.isDown("KeyA")) {
			this.player.speedX = -2
		}

		if (this.keyboardManager.isDown("ArrowUp") || this.keyboardManager.isDown("KeyW")) {
			this.player.speedY = -2
		}

		if (this.keyboardManager.isDown("ArrowDown") || this.keyboardManager.isDown("KeyS")) {
			this.player.speedY = 2
		}
	}
}