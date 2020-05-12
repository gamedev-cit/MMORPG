import Player from "./Player"
import playerRunFrame1Url from '../res/player_run_dwarf_frame_1.png'
import playerRunFrame2Url from '../res/player_run_dwarf_frame_2.png'


export default class Dwarf extends Player 
{
	type="dwarf"

	constructor()
	{
		super(40)

		this.sprite = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.from(playerRunFrame1Url),
			PIXI.Texture.from(playerRunFrame2Url)
			
		])
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		this.addChild(this.sprite)

		this.sprite.animationSpeed = 1
	}
}