import Item from "../Item";
import itemUrl from '../res/health_pack.png'

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
}