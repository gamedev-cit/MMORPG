import GameObject from "./GameObject";
import GameStage from "./GameStage";
import Bullet from "./Bullet";
import Weapon from "./items/Weapon";

export default class Character extends GameObject
{
	type = "unknown"
	class = 'character'

	weapon: Weapon = Weapon.magicBalls

	lastFireTime = 0

	isFiring = false
	fireTargetX = 0
	fireTargetY = 0

	health = 100
	fullHealth = 100

	healthBar = new PIXI.Graphics()

	speed = 2

	sprite!: PIXI.extras.AnimatedSprite

	nameLabel = new PIXI.Text()

	onAdded()
	{
		super.onAdded()

		GameStage.instance.characters.push(this)
		
		this.addChild(this.healthBar)

		this.nameLabel.anchor.x = 0.5
		this.nameLabel.y = -85
		this.nameLabel.style.fontSize = 14
		this.addChild(this.nameLabel)
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

		this.animateCharacter()

		this.nameLabel.text = this.name || ""
	}

	fire(targetX: number, targetY: number)
	{
		var timeSinceLastFire = (new Date()).getTime() - this.lastFireTime
		if (timeSinceLastFire > this.weapon.fireRate) {
			let dx = targetX - this.x
			let dy = targetY - this.y
			var length = Math.sqrt(dx*dx + dy*dy)
			let speedX = dx/length * this.weapon.bulletSpeed
			let speedY = dy/length * this.weapon.bulletSpeed

			var bullet = new Bullet(this, speedX, speedY, this.weapon.damage, this.weapon.bulletLifetime, this.weapon.bulletImageUrl)
			bullet.x = this.x + dx/length * (this.radius + 30)
			bullet.y = this.y + dy/length * (this.radius + 30)
			bullet.rotation = Math.atan2(dy, dx)
			GameStage.instance.world.addChildAt(bullet, 1)

			this.lastFireTime = (new Date()).getTime()
		}
	}

	data(): any
	{
		return {
			"id": this.id == "undefined" ? null : this.id,
			"position": {
				"x": this.x,
				"y": this.y
			},
			"speed": {
				"x": this.speedX,
				"y": this.speedY
			},
			"radius": this.radius,
			"type": this.type,
			"isFiring": this.isFiring,
			"fireTargetX": this.fireTargetX,
			"fireTargetY": this.fireTargetY,
			"health": this.health,
			"weapon": this.weapon.data(),
			"name": this.name
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
		this.name = data.name

		this.weapon = new Weapon(data.weapon)
	}

	animateCharacter()
	{
		if (Math.abs(this.speedX) < 0.4 && Math.abs(this.speedY) < 0.4) {
			this.sprite.stop()
		} else if (!this.sprite.playing) {
			this.sprite.gotoAndPlay(0)
		}

		if (this.speedX < 0) {
			this.sprite.scale.x = -1
		}
		if (this.speedX > 0) {
			this.sprite.scale.x = 1
		}
	}
}