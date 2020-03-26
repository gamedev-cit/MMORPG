import GameObject from "./GameObject";
import GameStage from "./GameStage";
import Bullet from "./Bullet";


export default class Character extends GameObject
{
	type= "unknown"


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
	
	fire(targetX: number, targetY: number)
	{
		var bullet = new Bullet(this, 2, 2)
		bullet.x = this.x
		bullet.y = this.y
		GameStage.instance.world.addChildAt(bullet, 1)
	}
}