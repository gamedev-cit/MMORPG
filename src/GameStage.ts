import * as PIXI from 'pixi.js';
import * as io from 'socket.io-client';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';
import Player from './players/Player';
import Knight from './players/Knight';
import PlayerController from './PlayerController';
import Dryad from './players/Dryad';
import Dwarf from './players/Dwarf';
import JJmans from './players/JJmans';
import Jotun from './players/Jotun';
import Necromancer from './players/Necromancer';
import Bee from './players/Bee';
import HumanSpider from './players/HumanSpider';
import Main from './Main';
import map1Url from './res/map_1.jpg'
import GameObjectManager from './GameObjectManager';
import Item from './items/Item'
import Hospital from './buildings/Hospital';
import Forge from './buildings/Forge';
import Enemy from './Enemy';
import EnemySlime from './EnemySlime';

export default class GameStage extends Stage
{
	static instance: GameStage

	socket: SocketIOClient.Socket

	world = new PIXI.Container()
	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()
	items = new Array<Item>()

	player!: Player
	playerController!: PlayerController
	gameObjectManager = new GameObjectManager()

	debugLabel = new PIXI.Text()

	playerType: string

	constructor(playerType: string)
	{
		super()


		GameStage.instance = this

		this.playerType = playerType

		this.socket = io.connect('wss://game-socket-server-1.herokuapp.com')

		this.socket.on("state", (state: any) => this.onGameState(state))

		var background = new PIXI.Sprite(PIXI.Texture.fromImage(map1Url))
		this.world.addChild(background)

		this.addChild(this.world)

		this.respawn()

		this.loadMap()

		this.debugLabel.style.fill = 0xffffff
		this.debugLabel.style.fontSize = 12
		this.addChild(this.debugLabel)
	}

	loadMap()
	{
		var hospital = new Hospital()
		hospital.x = 3200
		hospital.y = 3000
		this.world.addChild(hospital)

		var forge = new Forge()
		forge.x = 2700
		forge.y = 3000
		this.world.addChild(forge)
	}

	respawn()
	{
		this.world.removeChild(this.player)

		this.player = this.gameObjectManager.newObjectWithType(this.playerType) as Player
		this.player.x = 3000 + (Math.random()*500 - 250)
		this.player.y = 3000 + (Math.random()*500 - 250)
		this.player.name = window.localStorage["playerName"]

		this.playerController = new PlayerController(this.player)
		this.world.addChild(this.player)
	}

	onGameState(state: any)
	{
		this.debugLabel.text = JSON.stringify(state, null, "    ");

		this.player.id = this.socket.id;
		
		this.gameObjectManager.updateObjectsWithGameState(this.characters, state.characters)
		this.gameObjectManager.updateObjectsWithGameState(this.items, state.items)

		this.createEnemiesIfNeeded()
	}

	collideGameObjectsWithGameObjects()
    {
		for (let gameObjectA of this.gameObjects) {
            for (let gameObjectB of this.gameObjects) {
                if (gameObjectA === gameObjectB) {
                    continue
                }
                let deltaX = gameObjectA.x - gameObjectB.x
                let deltaY = gameObjectA.y - gameObjectB.y
                let distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
                if (distance < gameObjectA.radius + gameObjectB.radius) {
					gameObjectA.didHitGameObject(gameObjectB)
                }
            }
        }
	}

	update()
	{
		this.collideGameObjectsWithGameObjects()
		this.checkPlayerHealth()
		this.controlEnemies()

		this.socket.emit("character", this.player.data())
	
		this.moveCamera()
	}

	checkPlayerHealth()
	{
		if (this.player.health <= 0) {
			this.respawn()
		}
	}

	moveCamera()
	{
		this.world.x = -this.player.x + Main.instance.app.renderer.width*0.5
		this.world.y = -this.player.y + Main.instance.app.renderer.height*0.5
	}

	getEnemies(): Array<Enemy>
	{
		var enemies = new Array<Enemy>()
		for (var character of this.characters) {
			if (character instanceof Enemy) {
				enemies.push(character)
			}
		}
		return enemies
	}

	createEnemiesIfNeeded()
	{
		var enemies = this.getEnemies()
		if (enemies.length < 3) {
			var newEnemy = new EnemySlime()
			newEnemy.x = 3000 + Math.random() * 100
			newEnemy.y = 2700 + Math.random() * 100
			this.socket.emit("request_character", newEnemy.data())
		}
	}

	controlEnemies()
	{
		var enemies = this.getEnemies()
		for (var enemy of enemies) {
			if (enemy.owner == this.player.id) {
				enemy.ai()
				this.socket.emit("character", enemy.data())
			}
		}
	}
}