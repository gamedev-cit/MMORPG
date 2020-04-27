import playerRunFrame1Url from './res/player_run_shmel_frame_1.png'
import playerRunFrame2Url from './res/player_run_shmel_frame_2.png'
import playerRunFrame3Url from './res/player_run_shmel_frame_3.png'
import playerRunFrame4Url from './res/player_run_shmel_frame_4.png'

import Player from "./Player";

export default class Bee extends Player
{
	sprite: PIXI.extras.AnimatedSprite
	type="shmel"

	constructor()
	{
		super(40)

		this.sprite = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.from(playerRunFrame1Url),
			PIXI.Texture.from(playerRunFrame2Url),
			PIXI.Texture.from(playerRunFrame3Url),
			PIXI.Texture.from(playerRunFrame4Url)
		])
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		this.addChild(this.sprite)

		this.sprite.gotoAndPlay(0)
		this.sprite.animationSpeed = 0.2
	}
    
}