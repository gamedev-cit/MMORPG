import Item from "./Item";
import coinImageUrl from '../res/coin.png'

export default class Coin extends Item
{
	constructor()
	{
		super(30)

		this.texture = PIXI.Texture.fromImage(coinImageUrl)
	}
}