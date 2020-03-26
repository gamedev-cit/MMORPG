import GameObject from "./GameObject";
import Character from "./Character";
import bulletUrl from './res/bullet_1.png'

export default class Bullet extends GameObject
{
	owner: Character

	constructor(owner: Character, speedX: number, speedY: number)
	{
		super(10)

		this.texture = PIXI.Texture.fromImage(bulletUrl)
		
		this.owner = owner
		this.speedX = speedX
		this.speedY = speedY
	}
}