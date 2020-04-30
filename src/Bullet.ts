import GameObject from "./GameObject";
import Character from "./Character";
import GameStage from "./GameStage";
import Enemy from "./Enemy";

export default class Bullet extends GameObject
{
	owner: Character

	damage = 10
	lifetime = 500

	constructor(owner: Character, speedX: number, speedY: number, damage: number, lifetime: number, bulletImageUrl: string)
	{
		super(10)

		this.texture = PIXI.Texture.fromImage(bulletImageUrl)
		
		this.damage = damage
		this.lifetime = lifetime
		this.owner = owner
		this.speedX = speedX
		this.speedY = speedY

		setTimeout(() => {
            GameStage.instance.world.removeChild(this)
        }, this.lifetime)
	}

	didHitGameObject(gameObject: GameObject)
	{
		if (this.owner == gameObject) {
			return
		}

		var isEnemyOwnedByPlayer = (gameObject instanceof Enemy && (gameObject as Enemy).owner == GameStage.instance.player.id);
		if (isEnemyOwnedByPlayer) {
			(gameObject as Enemy).health -= this.damage
		}

		if (gameObject == GameStage.instance.player) {
			GameStage.instance.player.health -= this.damage
		}

		var isMeleeWeapon = (Math.hypot(this.speedX, this.speedY) < 2)
		if (isMeleeWeapon) {
			this.onRemoved()
		} else {
			GameStage.instance.world.removeChild(this)
		}
	}
}