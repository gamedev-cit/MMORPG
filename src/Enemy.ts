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
		var distanceToTarget = Math.sqrt(dx*dx + dy*dy)
		
		if (distanceToTarget < 300) {
			this.speedX = dx/distanceToTarget * this.speed
			this.speedY = dy/distanceToTarget * this.speed
		} else {
			this.speedX = 0
			this.speedY = 0
		}
	}
}