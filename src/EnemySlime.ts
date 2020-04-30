import playerRunFrame1Url from './res/slime_enemy_1.png'
import playerRunFrame2Url from './res/slime_enemy_2.png'
import playerRunFrame3Url from './res/slime_enemy_3.png'
import playerRunFrame4Url from './res/slime_enemy_4.png'


import Enemy from "./Enemy";

export default class EnemySlime extends Enemy
{
	sprite: PIXI.extras.AnimatedSprite
	type = "slime"

	constructor()
	{
		super(40)

		this.sprite = new PIXI.extras.AnimatedSprite([
            PIXI.Texture.from(playerRunFrame1Url),
            PIXI.Texture.from(playerRunFrame2Url),
            PIXI.Texture.from(playerRunFrame3Url),
			PIXI.Texture.from(playerRunFrame4Url),
			PIXI.Texture.from(playerRunFrame3Url),
			PIXI.Texture.from(playerRunFrame2Url)
		])
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		this.addChild(this.sprite)

		this.sprite.gotoAndPlay(0)
		this.sprite.animationSpeed = 0.075
	}
}