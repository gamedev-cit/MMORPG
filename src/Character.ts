import GameObject from "./GameObject";
import GameStage from "./GameStage";
import Bullet from "./Bullet";

export default class Character extends GameObject
{
	type = "unknown"

	lastFireTime = 0
    fireRate = 50
	bulletSpeed = 8

	isFiring = false
	fireTargetX = 0
	fireTargetY = 0

	health = 100

	onAdded()
	{
		super.onAdded()

		GameStage.instance.characters.push(this)
	}

	onRemoved()
	{
		super.onRemoved()

		let index = GameStage.instance.characters.indexOf(this)
		if (index != -1) {
			GameStage.instance.characters.splice(index, 1)
		}
	}

	update()
	{
		super.update()

		if (this.isFiring) {
			this.fire(this.fireTargetX, this.fireTargetY)
		}
	}

	fire(targetX: number, targetY: number)
	{
		var timeSinceLastFire = (new Date()).getTime() - this.lastFireTime
		if (timeSinceLastFire > this.fireRate) {
			let dx = targetX - this.x
			let dy = targetY - this.y
			var length = Math.sqrt(dx*dx + dy*dy)
			let speedX = dx/length * this.bulletSpeed
			let speedY = dy/length * this.bulletSpeed

			var bullet = new Bullet(this, speedX, speedY)
			bullet.x = this.x
			bullet.y = this.y
			GameStage.instance.world.addChildAt(bullet, 1)

			this.lastFireTime = (new Date()).getTime()
		}
	}
}