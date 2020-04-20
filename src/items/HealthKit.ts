import Item from "../Item";
import itemUrl from '../res/health_pack.png'
import GameObject from "../GameObject";
import GameStage from "../GameStage";

export default class HealthKit extends Item
{
	constructor()
	{
		super(30)

		var sprite = new PIXI.Sprite(PIXI.Texture.from(itemUrl))
		sprite.anchor.x = 0.5
		sprite.anchor.y = 0.5
		this.addChild(sprite)
	}

	didHitGameObject(gameObject: GameObject)
    {
        if (gameObject == GameStage.instance.player) {
			GameStage.instance.player.health += 30
			GameStage.instance.world.removeChild(this)

			GameStage.instance.socket.emit("delete_item", {
				"id": this.id
			})
		}
	}
}