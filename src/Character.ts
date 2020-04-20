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
	fullHealth = 100

	healthBar = new PIXI.Graphics()

	onAdded()
	{
		super.onAdded()

		GameStage.instance.characters.push(this)
		
		this.addChild(this.healthBar)
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

		this.healthBar.clear()

		var healthBarWidth = 70 * this.health / this.fullHealth
		if (healthBarWidth < 1) {
			healthBarWidth = 1
		}
		this.healthBar.beginFill(0xcf7070)
		this.healthBar.drawRect(-35, -60, healthBarWidth, 8)
		this.healthBar.endFill()
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

	updateWithData(data: any): void
	{
		this.x = data.position.x
		this.y = data.position.y
		this.speedX = data.speed.x
		this.speedY = data.speed.y
		this.isFiring = data.isFiring
		this.fireTargetX = data.fireTargetX
		this.fireTargetY = data.fireTargetY
		this.health = data.health
	}
}