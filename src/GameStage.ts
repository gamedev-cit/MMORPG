import * as PIXI from 'pixi.js';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';


export default class GameStage extends Stage
{
	static instance: GameStage

	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()

	constructor()
	{
		super()
		
		GameStage.instance = this
	}
}