import * as PIXI from 'pixi.js';
import * as io from 'socket.io-client';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';
import Player from './players/Player';
import Enemy from './Enemy';
import PlayerController from './PlayerController';
import Main from './Main';
import map1Url from './res/map_1.jpg'
import GameObjectManager from './GameObjectManager';
import Item from './items/Item'
import Hospital from './buildings/Hospital';
import Forge from './buildings/Forge';
import EnemySlime from './EnemySlime';
import Mine from './buildings/Mine';
import Building from './buildings/Building';
import Tower from './buildings/Tower';
import MainBuilding from './buildings/MainBuilding';

export default class GameStage extends Stage
{
	static instance: GameStage

	socket: SocketIOClient.Socket

	world = new PIXI.Container()
	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()
	items = new Array<Item>()
	timeSinceLastEnemyKilled = 0

	player!: Player
	playerController!: PlayerController
	gameObjectManager = new GameObjectManager()

	coinsLabel = new PIXI.Text()

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

		this.coinsLabel.style.fill = 0x000000
		this.coinsLabel.style.fontSize = 12
		this.addChild(this.coinsLabel)
	}

	loadMap()
	{
		var hospital = new Hospital()
		hospital.x = 3200
		hospital.y = 3000
		hospital.id = "hospital"
		this.socket.emit("character", hospital.data())

		var forge = new Forge()
		forge.x = 2700
		forge.y = 3000
		forge.id = "forge"
		this.socket.emit("character", forge.data())

		var mine = new Mine()
		mine.x = 2700
		mine.y = 3500
		this.world.addChild(mine)

		var tower = new Tower()
		tower.x = 2900
		tower.y = 2700
		tower.id = "tower"
		this.socket.emit("character", tower.data())

		var mainBuilding = new MainBuilding()
		mainBuilding.x = 3200
		mainBuilding.y = 3400
		mainBuilding.id = "main"
		this.socket.emit("character", mainBuilding.data())
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
		this.player.id = this.socket.id;
		
		this.gameObjectManager.updateObjectsWithGameState(this.characters, state.characters)
		this.gameObjectManager.updateObjectsWithGameState(this.items, state.items)
		this.timeSinceLastEnemyKilled = state.timeSinceLastEnemyKilled

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
		this.controlBuildings()

		this.socket.emit("character", this.player.data())
	
		this.moveCamera()

		this.coinsLabel.text = "Coins: " + this.player.coins
	}

	checkPlayerHealth()
	{
		if (this.player.health <= 0) {
			this.dropCoins()
			this.respawn()
		}
	}

	dropCoins()
	{
		for (var i=0; i<this.player.coins/2; i++) {
			var angle = Math.random() * Math.PI*2
			
			GameStage.instance.socket.emit("item", {
				"id": "item_" + Math.random(),
				"type": "coin",
				"position": {
					"x": this.player.x + (30 + Math.random() * 110) * Math.cos(angle),
					"y": this.player.y + (30 + Math.random() * 110) * Math.sin(angle)
				}
			})
		}
	}

	moveCamera()
	{
		this.world.x = -this.player.x + Main.instance.app.renderer.width*0.5
		this.world.y = -this.player.y + Main.instance.app.renderer.height*0.5
	}

	getPlayers(): Array<Player>
	{
		var players = new Array<Player>()
		for (var character of this.characters) {
			if (character.class == "player") {
				players.push(character as Player)
			}
		}
		return players
	}

	getEnemies(): Array<Enemy>
	{
		var enemies = new Array<Enemy>()
		for (var character of this.characters) {
			if (character.class == "enemy") {
				enemies.push(character as Enemy)
			}
		}
		return enemies
	}

	getBuildings(): Array<Building>
	{
		var buildings = new Array<Building>()
		for (var character of this.characters) {
			if (character.class == "building") {
				buildings.push(character as Building)
			}
		}
		return buildings
	}

	createEnemiesIfNeeded()
	{
		var enemies = this.getEnemies()
		var shouldCreateEnemies = (enemies.length < 100)
		if (this.timeSinceLastEnemyKilled < 20 * 1000 ||
			this.timeSinceLastEnemyKilled > 40 * 1000) {
			shouldCreateEnemies = false
		}
		if (this.timeSinceLastEnemyKilled > 40 * 1000 && enemies.length == 0) {
			shouldCreateEnemies = true
		}
		
		if (shouldCreateEnemies) {
			var newEnemy = new EnemySlime()
			newEnemy.x = 3000 + Math.random() * 400
			newEnemy.y = 2000 + Math.random() * 400
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

				if (enemy.health <= 0) {
					this.socket.emit("delete_character", enemy.data())
				}
			}
		}
	}

	controlBuildings()
	{
		var buildings = this.getBuildings()
		for (var building of buildings) {
			if (building.owner == this.player.id) {
				building.ai()
				this.socket.emit("character", building.data())

				if (building.health <= 0) {
					this.socket.emit("delete_character", building.data())
				}
			}
		}
	}
}