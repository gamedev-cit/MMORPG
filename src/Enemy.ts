import GameObject from "./GameObject";
import Character from "./Character";
import GameStage from "./GameStage";

export default class Enemy extends Character
{
	owner = "noone"
	class = 'enemy'
	
	targetX = 0
	targetY = 0

	collisionDamage = 0.5

	updateWithData(data: any): void
	{
		super.updateWithData(data)

		this.owner = data.owner
	}

	ai()
	{
		var players = GameStage.instance.getPlayers()
		
		var nearestPlayer = GameStage.instance.player
		var minimumDistance = 1000000
		for (var player of players) {
			let dx = player.x - this.x
			let dy = player.y - this.y
			var distanceToPlayer = Math.sqrt(dx*dx + dy*dy)

			if (distanceToPlayer < minimumDistance) {
				minimumDistance = distanceToPlayer
				nearestPlayer = player
			}
		}

		this.targetX = nearestPlayer.x
		this.targetY = nearestPlayer.y

		let dx = this.targetX - this.x
		let dy = this.targetY - this.y
		var distanceToTarget = Math.sqrt(dx*dx + dy*dy)
		
		if (distanceToTarget < 300) {
			this.speedX = dx/distanceToTarget * this.speed
			this.speedY = dy/distanceToTarget * this.speed
		} else {
			this.speedX = 0
			this.speedY = 0

	didHitGameObject(gameObject: GameObject)
	{
		if (gameObject == GameStage.instance.player) {
			GameStage.instance.player.health -= this.collisionDamage
		}
	}
}