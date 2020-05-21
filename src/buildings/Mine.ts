import GameObject from "../GameObject";
import GameStage from "../GameStage";
import imageUrl from '../res/building_mine.png'

export default class Mine extends GameObject
{
	buildProgress = 0

	constructor()
	{
		super(50)

		this.texture = PIXI.Texture.from(imageUrl)
	}

	didHitGameObject(gameObject: GameObject)
    {
        if (gameObject == GameStage.instance.player) {
			this.buildProgress += 1

			if (this.buildProgress > 120) {
				var angle = Math.random() * Math.PI*2
				
				GameStage.instance.socket.emit("item", {
					"id": "item_" + Math.random(),
					"type": "coin",
					"position": {
						"x": this.x + 200 * Math.cos(angle),
						"y": this.y + 200 * Math.sin(angle),
					}
				})

				this.buildProgress = 0
			}
		}
    }
}