import * as PIXI from 'pixi.js';
import * as io from 'socket.io-client';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';
import Player from './Player';
import Knight from './Knight';
import PlayerController from './PlayerController';
import Dryad from './Dryad';
import Dwarf from './Dwarf';
import JJmans from './JJmans';
import Jotun from './Jotun';
import Necromancer from './Necromancer';
import Bee from './Bee';
import HumanSpider from './HumanSpider';


export default class GameStage extends Stage
{
	static instance: GameStage

	socket: SocketIOClient.Socket

	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()

	player: Player
	playerController: PlayerController

	debugLabel = new PIXI.Text()

	constructor(playerType: string)
	{
		super()

		GameStage.instance = this

		this.socket = io.connect('wss://game-socket-server-1.appspot.com')

		this.socket.on("state", (state: any) => this.onGameState(state))

		this.player = this.newPlayerWithType(playerType)

		this.playerController = new PlayerController(this.player)

		this.addChild(this.player)

		this.debugLabel.style.fill = 0xffffff
		this.debugLabel.style.fontSize = 12
		this.addChild(this.debugLabel)
	}

	newPlayerWithType(type: string): Player
	{
		if (type == "dryad") {
			return new Dryad()
		}
		if (type == "dwarf") {
			return new Dwarf()
		}
		if (type == "jjman") {
			return new JJmans()
		}
		if (type == "jotun") {
			return new Jotun()
		}
		if (type == "knight") {
			return new Knight()
		}
		if (type == "necromancer") {
			return new Necromancer()
		}
		if (type == "shmel") {
			return new Bee()
		}
		if (type == "spider") {
			return new HumanSpider()
		}
		return new Knight()
	}

	onGameState(state: any)
	{
		this.debugLabel.text = JSON.stringify(state, null, "    ");

		this.player.id = this.socket.id;
		this.addNewCharacters(state)
		this.removeOldCharacters(state)

		for (let characterData of state.characters) {
			if (characterData.id == this.player.id) {
				continue;
			}
			var character = this.getCharacterWithId(characterData.id)!
			character.x = characterData.position.x
			character.y = characterData.position.y
			character.speedX = characterData.speed.x
			character.speedY = characterData.speed.y
			
		}
	}

	addNewCharacters(state: any)
	{
		for (let characterData of state.characters) {
			if (this.getCharacterWithId(characterData.id) == null) {
				var newPlayer = this.newPlayerWithType(characterData.type)
				newPlayer.id = characterData.id
				this.addChild(newPlayer)
			}
		}
	}

	removeOldCharacters(state: any)
	{
		for (let character of this.characters) {
			var exists = false
			for (let characterData of state.characters) {
				if (characterData.id == character.id) {
					exists = true
				}
			}

			if (!exists && character != this.player) {
				this.removeChild(character)
			}
		}
	}

	getCharacterWithId(id: String): Character | null
	{
		for (let character of this.characters) {
			if (character.id == id) {
				return character
			}
		}

		return null
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
			"type": this.player.type
		})
	}
}