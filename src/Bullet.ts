import GameObject from "./GameObject";
import Character from "./Character";
import bulletUrl from './res/bullet_1.png'
import GameStage from "./GameStage";

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

		if (gameObject == GameStage.instance.player) {
			GameStage.instance.player.health -= this.damage
		}

		GameStage.instance.world.removeChild(this)
	}
}