import Building from "./Building"
import imageUrl from "../res/tower_1.png"
import GameStage from "../GameStage"
import Weapon from '../items/Weapon';
import Character from "../Character";

export default class Tower extends Building
{
	type = "tower"

	fullHealth = 500
	health = 500

	weapon = Weapon.towerMagicBalls

	constructor()
	{
		super(50)

		this.texture = PIXI.Texture.fromImage(imageUrl)
	}

	ai()
	{
		var enemies = new Array<Character>()
		for (var character of GameStage.instance.characters) {
			if (character.team != this.team) {
				enemies.push(character)
			}
		}

		if (enemies.length == 0) {
			return
		}

		var nearestEnemy = enemies[0]
		var minimumDistance = 1000000

		for (var enemy of enemies) {
			let dx = enemy.x - this.x
			let dy = enemy.y - this.y
			let distance = Math.sqrt(dx*dx + dy*dy)

			if (distance < minimumDistance) {
				minimumDistance = distance
				nearestEnemy = enemy
			}
		}

		if (minimumDistance < 300) {
			this.fireTargetX = nearestEnemy.x
			this.fireTargetY = nearestEnemy.y
			this.isFiring = true
		} else {
			this.isFiring = false
		}
	}
}