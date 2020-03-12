import * as PIXI from 'pixi.js';
import * as io from 'socket.io-client';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';
import Player from './Player';
import Knight from './Knight';
import PlayerController from './PlayerController';


export default class GameStage extends Stage
{
	static instance: GameStage

	socket: SocketIOClient.Socket

	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()

	player: Player
	playerController: PlayerController

	debugLabel = new PIXI.Text()

	constructor()
	{
		super()

		GameStage.instance = this

		this.socket = io.connect('wss://game-socket-server-1.appspot.com')

		this.socket.on("state", (state: any) => this.onGameState(state))

		this.player = new Knight()
		this.playerController = new PlayerController(this.player)

		this.addChild(this.player)

		this.debugLabel.style.fill = 0xffffff
		this.debugLabel.style.fontSize = 12
		this.addChild(this.debugLabel)
	}

	onGameState(state: any)
	{
		this.debugLabel.text = JSON.stringify(state, null, "    ");
	}

	update()
	{
		this.socket.emit("character", {
			"position": {
				"x": this.player.x,
				"y": this.player.y
			},
			"speed": {
				"x": this.player.speedX,
				"y": this.player.speedY
			},
			"radius": this.player.radius,
			"type": "player"
		})
	}
}