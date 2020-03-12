import * as PIXI from 'pixi.js';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';
import Player from './Player';
import Knight from './Knight';
import PlayerController from './PlayerController';


export default class GameStage extends Stage
{
	static instance: GameStage

	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()

	player: Player

	playerController: PlayerController

	constructor()
	{
		super()

		GameStage.instance = this

		this.player = new Knight()

		this.playerController = new PlayerController(this.player)

		this.addChild(this.player)	
	}
}
