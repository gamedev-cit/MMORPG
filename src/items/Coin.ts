import Item from "./Item";
import coinImageUrl from '../res/coin.png'
import GameObject from "../GameObject";
import GameStage from "../GameStage";

export default class Coin extends Item
{
	constructor()
	{
		super(30)

		this.texture = PIXI.Texture.fromImage(coinImageUrl)
	}

	didHitGameObject(gameObject: GameObject)
    {
        if (gameObject == GameStage.instance.player) {

			GameStage.instance.player.coins += 1

			GameStage.instance.world.removeChild(this)
			GameStage.instance.socket.emit("delete_item", {
				"id": this.id
			})
		}
    }
}