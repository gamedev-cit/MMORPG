import GameObject from "../GameObject";
import Character from "../Character";
import playerRunFrame1Url from '../res/player_run_necromancer_frame_1.png'
import playerRunFrame2Url from '../res/player_run_necromancer_frame_2.png'

import Player from "./Player";

export default class Necromancer extends Player
{
	sprite: PIXI.extras.AnimatedSprite
	type="necromancer"

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
		this.sprite.animationSpeed = 0.05
	}
	animateCharacter(){
		if (this.speedX < 0) {
			this.sprite.scale.x = -1
		}
		if (this.speedX > 0) {
			this.sprite.scale.x = 1
		}
	}
}