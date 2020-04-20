import GameObject from "../GameObject";
import GameStage from "../GameStage";
import imageUrl from '../res/building_1.png'

export default class Hospital extends GameObject
{
	buildProgress = 0

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
				GameStage.instance.socket.emit("item", {
					"id": "item_" + Math.random(),
					"type": "healkit",
					"position": {
						"x": this.x + 200,
						"y": this.y,
					}
				})

				this.buildProgress = 0
			}
		}
    }
}