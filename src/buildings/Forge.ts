import GameObject from "../GameObject";
import GameStage from "../GameStage";
import imageUrl from '../res/building_2.png'
import Weapon from "../items/Weapon";
import Building from "./Building";

export default class Forge extends Building
{
	buildProgress = 0
	type = "forge"

	constructor()
	{
		super(50)

		var sprite = new PIXI.Sprite(PIXI.Texture.from(imageUrl))
		sprite.anchor.x = 0.5
		sprite.anchor.y = 0.5
		this.addChild(sprite)
	}

	didHitGameObject(gameObject: GameObject)
    {
        if (gameObject == GameStage.instance.player) {
			this.buildProgress += 1

			if (this.buildProgress > 120) {
				var angle = Math.random() * Math.PI*2
				
				GameStage.instance.socket.emit("item", {
					"id": "item_" + Math.random(),
					"type": "weapon",
					"position": {
						"x": this.x + 200 * Math.cos(angle),
						"y": this.y + 200 * Math.sin(angle),
					},
					"weapon": Weapon.sword.data()
				})

				this.buildProgress = 0
			}
		}
    }
}