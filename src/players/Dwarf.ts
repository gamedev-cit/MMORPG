import Player from "./Player"
import playerRunFrame1Url from '../res/player_run_dwarf_frame_1.png'
import playerRunFrame2Url from '../res/player_run_dwarf_frame_2.png'
import playerRunFrame3Url from '../res/player_run_dwarf_frame_3.png'
import playerRunFrame4Url from '../res/player_run_dwarf_frame_4.png'
import playerRunFrame5Url from '../res/player_run_dwarf_frame_5.png'
import playerRunFrame6Url from '../res/player_run_dwarf_frame_6.png'
import playerRunFrame7Url from '../res/player_run_dwarf_frame_7.png'
import playerRunFrame8Url from '../res/player_run_dwarf_frame_8.png'
import playerRunFrame9Url from '../res/player_run_dwarf_frame_9.png'
import playerRunFrame10Url from '../res/player_run_dwarf_frame_10.png'
import playerRunFrame11Url from '../res/player_run_dwarf_frame_11.png'
import playerRunFrame12Url from '../res/player_run_dwarf_frame_12.png'
import playerRunFrame13Url from '../res/player_run_dwarf_frame_13.png'
import playerRunFrame14Url from '../res/player_run_dwarf_frame_14.png'
import playerRunFrame15Url from '../res/player_run_dwarf_frame_15.png'
import playerRunFrame16Url from '../res/player_run_dwarf_frame_16.png'
import playerRunFrame17Url from '../res/player_run_dwarf_frame_17.png'
import playerRunFrame18Url from '../res/player_run_dwarf_frame_18.png'
import playerRunFrame19Url from '../res/player_run_dwarf_frame_19.png'
import playerRunFrame20Url from '../res/player_run_dwarf_frame_20.png'
import playerRunFrame21Url from '../res/player_run_dwarf_frame_21.png'
import playerRunFrame22Url from '../res/player_run_dwarf_frame_22.png'
import playerRunFrame23Url from '../res/player_run_dwarf_frame_23.png'

export default class Dwarf extends Player 
{
	type="dwarf"

	constructor()
	{
		super(40)

		this.sprite = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.from(playerRunFrame1Url),
			PIXI.Texture.from(playerRunFrame2Url),
			PIXI.Texture.from(playerRunFrame3Url),
			PIXI.Texture.from(playerRunFrame4Url),
			PIXI.Texture.from(playerRunFrame5Url),
			PIXI.Texture.from(playerRunFrame6Url),
			PIXI.Texture.from(playerRunFrame7Url),
			PIXI.Texture.from(playerRunFrame8Url),
			PIXI.Texture.from(playerRunFrame9Url),
			PIXI.Texture.from(playerRunFrame10Url),
			PIXI.Texture.from(playerRunFrame11Url),
			PIXI.Texture.from(playerRunFrame12Url),
			PIXI.Texture.from(playerRunFrame13Url),
			PIXI.Texture.from(playerRunFrame14Url),
			PIXI.Texture.from(playerRunFrame15Url),
			PIXI.Texture.from(playerRunFrame16Url),
			PIXI.Texture.from(playerRunFrame17Url),
			PIXI.Texture.from(playerRunFrame18Url),
			PIXI.Texture.from(playerRunFrame19Url),
			PIXI.Texture.from(playerRunFrame20Url),
			PIXI.Texture.from(playerRunFrame21Url),
			PIXI.Texture.from(playerRunFrame22Url),
			PIXI.Texture.from(playerRunFrame23Url)
		])
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		this.addChild(this.sprite)

		this.sprite.animationSpeed = 1
	}
}