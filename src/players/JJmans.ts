import playerRunFrame1Url from '../res/JJplayer1.png'
import playerRunFrame2Url from '../res/JJplayer2.png'
import Player from "./Player";

export default class JJmans extends Player
{
	sprite: PIXI.extras.AnimatedSprite
	type="jjman"

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

		this.sprite.gotoAndPlay(0)
		this.sprite.animationSpeed = 0.2
	}
}	