import Character from "./Character";
import GameStage from "./GameStage";
import KeyboardManager from "./KeyboardManager";
import MouseManager from "./MouseManager";
import Main from "./Main";
import Tower from "./buildings/Tower";
import Player from "./players/Player";

export default class PlayerController
{
	player: Player
	

	keyboardManager = new KeyboardManager()
	mouseManager = new MouseManager(GameStage.instance)

	constructor(player: Player)
	{
		this.player = player

		Main.instance.app.ticker.add(this.update, this)
	}

	update()
	{
        this.player.speedX = this.player.speedX * 0.8
        this.player.speedY = this.player.speedY * 0.8

		if (this.keyboardManager.isDown("ArrowRight") || this.keyboardManager.isDown("KeyD")) {
			this.player.speedX = this.player.speed
		}

		if (this.keyboardManager.isDown("ArrowLeft") || this.keyboardManager.isDown("KeyA")) {
			this.player.speedX = -this.player.speed
		}

		if (this.keyboardManager.isDown("ArrowUp") || this.keyboardManager.isDown("KeyW")) {
			this.player.speedY = -this.player.speed
		}

		if (this.keyboardManager.isDown("ArrowDown") || this.keyboardManager.isDown("KeyS")) {
			this.player.speedY = this.player.speed
		}

		if (this.mouseManager.mouseDown) {
			this.player.isFiring = true
			this.player.fireTargetX = this.mouseManager.mouseX - GameStage.instance.world.x;
			this.player.fireTargetY = this.mouseManager.mouseY - GameStage.instance.world.y;
		} else {
			this.player.isFiring = false
		}

		if (this.keyboardManager.isDown("KeyT")) {
			if (this.player.coins >= 10) {
				var tower = new Tower()
				tower.x = this.player.x
				tower.y = this.player.y
				tower.id = "tower_" + Math.random()
				GameStage.instance.socket.emit("character", tower.data())

				this.player.coins -= 10
			}
		}
	}
}