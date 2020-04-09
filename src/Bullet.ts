import GameObject from "./GameObject";
import Character from "./Character";
import bulletUrl from './res/bullet_1.png'
import GameStage from "./GameStage";

export default class Bullet extends GameObject
{
	owner: Character

	lifetime = 500

	constructor(owner: Character, speedX: number, speedY: number)
	{
		super(10)

		this.texture = PIXI.Texture.fromImage(bulletUrl)
		
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

		GameStage.instance.world.removeChild(this)
	}
}