import playerRunFrame1Url from './res/player_run_tree_4_frame.png'
import Player from "./Player"; 

export default class Jotun extends Player
{
	sprite: PIXI.extras.AnimatedSprite
	type="jotun"

	constructor()
	{
		super(40)

		this.sprite = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.from(playerRunFrame1Url)
		])
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		this.addChild(this.sprite)

		this.sprite.gotoAndPlay(0)
		this.sprite.animationSpeed = 0.2
	}
}