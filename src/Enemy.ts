import GameObject from "./GameObject";
import Character from "./Character";
import GameStage from "./GameStage";

export default class Enemy extends Character
{
	owner = "noone"
	
	targetX = 0
	targetY = 0

	updateWithData(data: any): void
	{
		super.updateWithData(data)

		this.owner = data.owner
	}

	ai()
	{
		this.targetX = GameStage.instance.player.x
		this.targetY = GameStage.instance.player.y

		let dx = this.targetX - this.x
		let dy = this.targetY - this.y
		var length = Math.sqrt(dx*dx + dy*dy)
		
		this.speedX = dx/length * this.speed
		this.speedY = dy/length * this.speed
	}
}