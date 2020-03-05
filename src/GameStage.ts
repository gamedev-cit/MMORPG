import * as PIXI from 'pixi.js';
import Stage from './Stage';
import GameObject from './GameObject';

export default class GameStage extends Stage
{
    static instance: GameStage
    
    gameObjects = new Array<GameObject>()

	constructor()
	{
		super()
		
		GameStage.instance = this
	}
}