import Building from "./Building"
import imageUrl from '../res/building_main.png'

export default class MainBuilding extends Building
{
	type = "main"

	fullHealth = 1000
	health = 1000

	constructor()
	{
		super(100)

		this.texture = PIXI.Texture.fromImage(imageUrl)
	}
}
